import { hashCode } from "./storage.js";

export function taskCode(task, state) {
  return state.code[task.id] ?? task.starter;
}

export function getStatus(task, state) {
  const code = taskCode(task, state);
  const dirty = code !== task.starter;
  const result = state.results[task.id];
  const same = Boolean(result && result.hash === hashCode(code));
  if (same && result.ok) return "verified";
  if (result?.ok) return "stale";
  if (same && result && !result.ok) return "failed";
  if (!task.tests.length && state.manual[task.id]) return "manual";
  if (dirty) return "draft";
  return "new";
}

export function isMastered(status) {
  return status === "verified" || status === "stale" || status === "manual";
}

export function levelName(ratio) {
  if (ratio >= 1) return "освоено";
  if (ratio >= 0.7) return "уверенно";
  if (ratio >= 0.35) return "в практике";
  if (ratio > 0) return "начато";
  return "не начато";
}

export function summarize(sections, state) {
  const decorated = sections.map((section) => {
    let mastered = 0;
    let verified = 0;
    let manual = 0;
    let tested = 0;
    const tasks = section.tasks.map((task) => {
      const status = getStatus(task, state);
      if (task.tests.length) tested += 1;
      if (status === "verified" || status === "stale") verified += 1;
      if (status === "manual") manual += 1;
      if (isMastered(status)) mastered += 1;
      return { ...task, status };
    });
    return { ...section, tasks, mastered, verified, manual, tested, total: tasks.length };
  });

  return {
    sections: decorated,
    total: decorated.reduce((sum, section) => sum + section.total, 0),
    mastered: decorated.reduce((sum, section) => sum + section.mastered, 0),
    verified: decorated.reduce((sum, section) => sum + section.verified, 0),
    manual: decorated.reduce((sum, section) => sum + section.manual, 0),
    tested: decorated.reduce((sum, section) => sum + section.tested, 0),
  };
}

export function firstOpenTask(section) {
  return section.tasks.find((task) => !isMastered(task.status)) || section.tasks[0];
}
