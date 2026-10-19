import { useState } from "react";
import { CodeEditor } from "./CodeEditor.jsx";
import { TestPanel } from "./TestPanel.jsx";

const STATUS_LABEL = {
  verified: "тесты пройдены",
  stale: "правки после зачёта",
  failed: "тесты не прошли",
  manual: "отмечено вручную",
  draft: "в работе",
  new: "не начато",
};

export function Workspace({
  section,
  task,
  status,
  code,
  editorNonce,
  result,
  running,
  manual,
  onChangeCode,
  onRun,
  onReset,
  onToggleManual,
  onPrev,
  onNext,
  position,
}) {
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="workspace">
      <header className="work-head">
        <div>
          <p className="eyebrow">
            {section.index} · {section.title}
          </p>
          <div className="title-row">
            <h1>{task.name}</h1>
            <span className={`status-chip ${status}`}>{STATUS_LABEL[status]}</span>
          </div>
          <p className="signature">
            {task.signature}
            {task.returns ? <span> → {task.returns}</span> : null}
          </p>
        </div>
        <div className="pager">
          <button type="button" className="btn ghost" onClick={onPrev} disabled={!onPrev}>
            Назад
          </button>
          <span>
            {position.index}/{position.total}
          </span>
          <button type="button" className="btn ghost" onClick={onNext} disabled={!onNext}>
            Дальше
          </button>
        </div>
      </header>

      <section className="brief">
        <p>{task.summary}</p>
        <dl>
          {task.input ? (
            <div>
              <dt>Вход</dt>
              <dd>{task.input}</dd>
            </div>
          ) : null}
          {task.output ? (
            <div>
              <dt>Выход</dt>
              <dd>{task.output}</dd>
            </div>
          ) : null}
        </dl>
      </section>

      <div className="work-main">
        <div className="editor-column">
          <CodeEditor
            key={`${task.id}:${editorNonce}`}
            fileName={`${task.name}.js`}
            path={`${task.sectionId}-${task.name}.js`}
            initialCode={code}
            onChange={onChangeCode}
            onRun={onRun}
            running={running}
            canRun={task.tests.length > 0}
          />
          <div className="editor-tools">
            {confirmReset ? (
              <>
                <span>Вернуть пустой каркас функции?</span>
                <button
                  type="button"
                  className="btn danger"
                  onClick={() => {
                    setConfirmReset(false);
                    onReset();
                  }}
                >
                  Сбросить код
                </button>
                <button type="button" className="btn ghost" onClick={() => setConfirmReset(false)}>
                  Отмена
                </button>
              </>
            ) : (
              <button type="button" className="text-button" onClick={() => setConfirmReset(true)}>
                Сбросить код задачи
              </button>
            )}
          </div>
        </div>
        <TestPanel task={task} result={result} running={running} manual={manual} onToggleManual={onToggleManual} />
      </div>
    </div>
  );
}
