import { useEffect, useMemo, useRef, useState } from "react";
import { catalog, findTask } from "./catalog.js";
import { firstOpenTask, summarize, taskCode } from "./skills.js";
import { emptyState, hashCode, loadState, saveState } from "./storage.js";
import { runInWorker } from "./runner/client.js";
import { prepareUserCode } from "./runner/runProgram.js";
import { Sidebar } from "./components/Sidebar.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import { Workspace } from "./components/Workspace.jsx";

function parseHash(hash) {
  const parts = hash.replace(/^#/, "").split("/").filter(Boolean);
  if (parts[0] === "task" && parts[1] && parts[2]) {
    return {
      name: "task",
      sectionId: decodeURIComponent(parts[1]),
      taskName: decodeURIComponent(parts.slice(2).join("/")),
    };
  }
  return { name: "dashboard" };
}

function buildHash(route) {
  if (route.name === "task") {
    return `#/task/${encodeURIComponent(route.sectionId)}/${encodeURIComponent(route.taskName)}`;
  }
  return "#/";
}

export function App() {
  const [state, setState] = useState(loadState);
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  const [query, setQuery] = useState("");
  const [editorNonce, setEditorNonce] = useState(0);
  const [runningId, setRunningId] = useState(null);
  const [batch, setBatch] = useState(null);
  const stateRef = useRef(state);
  const cancelRef = useRef(false);
  stateRef.current = state;

  const summary = useMemo(() => summarize(catalog, state), [state]);

  useEffect(() => {
    const onHash = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function navigate(next) {
    const hash = buildHash(next);
    if (window.location.hash !== hash) window.location.hash = hash;
    else setRoute(next);
  }

  function patch(updater) {
    setState((previous) => {
      const next = updater(previous);
      saveState(next);
      return next;
    });
  }

  function openTask(sectionId, taskName) {
    patch((previous) => ({ ...previous, lastTaskId: `${sectionId}/${taskName}` }));
    navigate({ name: "task", sectionId, taskName });
  }

  const located = route.name === "task" ? findTask(route.sectionId, route.taskName) : null;
  const continueTarget = useMemo(() => {
    if (state.lastTaskId) {
      const slash = state.lastTaskId.indexOf("/");
      const sectionId = state.lastTaskId.slice(0, slash);
      const taskName = state.lastTaskId.slice(slash + 1);
      if (findTask(sectionId, taskName)) return { sectionId, taskName, continued: true };
    }
    const section = summary.sections[0];
    const task = firstOpenTask(section);
    return { sectionId: section.id, taskName: task.name, continued: false };
  }, [state.lastTaskId, summary.sections]);

  useEffect(() => {
    if (located) document.title = `${located.task.name} — Полигон`;
    else document.title = "Полигон — навыки JavaScript";
  }, [located]);

  function commitResult(taskId, code, outcome) {
    const ok = Boolean(!outcome.error && !outcome.hung && outcome.results?.length && outcome.results.every((item) => item.ok));
    patch((previous) => ({
      ...previous,
      results: {
        ...previous.results,
        [taskId]: {
          ok,
          hash: hashCode(code),
          at: Date.now(),
          error: outcome.error || "",
          cases: outcome.results || [],
        },
      },
    }));
  }

  async function runTask(section, task, code) {
    return runInWorker({
      prelude: section.prelude,
      tests: task.tests,
      userCode: prepareUserCode(code),
    });
  }

  async function runCurrent() {
    if (!located || runningId || !located.task.tests.length) return;
    const code = taskCode(located.task, stateRef.current);
    setRunningId(located.task.id);
    const outcome = await runTask(located.section, located.task, code);
    commitResult(located.task.id, code, outcome);
    setRunningId(null);
  }

  async function runAll() {
    const tasks = catalog.flatMap((section) => section.tasks.filter((task) => task.tests.length).map((task) => ({ section, task })));
    cancelRef.current = false;
    setBatch({ done: 0, total: tasks.length, label: "Старт", cancel: () => { cancelRef.current = true; } });
    for (let index = 0; index < tasks.length; index += 1) {
      if (cancelRef.current) break;
      const { section, task } = tasks[index];
      setBatch({ done: index, total: tasks.length, label: task.name, cancel: () => { cancelRef.current = true; } });
      const code = taskCode(task, stateRef.current);
      const outcome = await runTask(section, task, code);
      commitResult(task.id, code, outcome);
    }
    setBatch(null);
  }

  function resetAll() {
    if (!window.confirm("Сбросить весь локальный прогресс и решения в этом браузере?")) return;
    const next = emptyState();
    saveState(next);
    setState(next);
    setEditorNonce((value) => value + 1);
  }

  const activeSummarySection = located ? summary.sections.find((section) => section.id === located.section.id) : null;
  const activeSummaryTask = activeSummarySection?.tasks.find((task) => task.id === located?.task.id);

  return (
    <div className="app">
      <Sidebar
        summary={summary}
        route={route}
        query={query}
        onQuery={setQuery}
        onDashboard={() => navigate({ name: "dashboard" })}
        onOpenTask={openTask}
      />
      <main>
        {route.name === "dashboard" ? (
          <Dashboard
            summary={summary}
            onOpenTask={openTask}
            onRunAll={runAll}
            onResetAll={resetAll}
            batch={batch}
            continueTarget={continueTarget}
          />
        ) : null}
        {route.name === "task" && located && activeSummaryTask ? (
          <Workspace
            section={activeSummarySection}
            task={located.task}
            status={activeSummaryTask.status}
            code={taskCode(located.task, state)}
            editorNonce={editorNonce}
            result={viewResult(located.task, state)}
            running={runningId === located.task.id}
            manual={Boolean(state.manual[located.task.id])}
            onChangeCode={(code) => {
              const id = located.task.id;
              const starter = located.task.starter;
              patch((previous) => {
                const nextCode = { ...previous.code };
                if (code === starter) delete nextCode[id];
                else nextCode[id] = code;
                return { ...previous, code: nextCode, lastTaskId: id };
              });
            }}
            onRun={runCurrent}
            onReset={() => {
              const id = located.task.id;
              patch((previous) => {
                const nextCode = { ...previous.code };
                const manual = { ...previous.manual };
                const results = { ...previous.results };
                delete nextCode[id];
                delete manual[id];
                delete results[id];
                return { ...previous, code: nextCode, manual, results };
              });
              setEditorNonce((value) => value + 1);
            }}
            onToggleManual={() => {
              const id = located.task.id;
              patch((previous) => {
                const manual = { ...previous.manual };
                if (manual[id]) delete manual[id];
                else manual[id] = true;
                return { ...previous, manual };
              });
            }}
            onPrev={previousTask(activeSummarySection, located.task.name, openTask)}
            onNext={nextTask(activeSummarySection, located.task.name, openTask)}
            position={positionOf(activeSummarySection, located.task.name)}
          />
        ) : null}
        {route.name === "task" && !located ? (
          <div className="missing">
            <h1>Задача не найдена</h1>
            <button type="button" className="btn primary" onClick={() => navigate({ name: "dashboard" })}>
              К обзору
            </button>
          </div>
        ) : null}
      </main>
    </div>
  );
}

function viewResult(task, state) {
  const result = state.results[task.id];
  if (!result) return null;
  return { ...result, stale: result.hash !== hashCode(taskCode(task, state)) };
}

function positionOf(section, taskName) {
  const index = section.tasks.findIndex((task) => task.name === taskName);
  return { index: index + 1, total: section.tasks.length };
}

function previousTask(section, taskName, openTask) {
  const index = section.tasks.findIndex((task) => task.name === taskName);
  const task = section.tasks[index - 1];
  return task ? () => openTask(section.id, task.name) : null;
}

function nextTask(section, taskName, openTask) {
  const index = section.tasks.findIndex((task) => task.name === taskName);
  const task = section.tasks[index + 1];
  return task ? () => openTask(section.id, task.name) : null;
}
