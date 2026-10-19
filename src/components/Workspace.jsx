import { useState } from "react";
import { CodeEditor } from "./CodeEditor.jsx";
import { TestPanel } from "./TestPanel.jsx";
import { useI18n } from "../i18n/LocaleContext.jsx";
import { sectionCopy } from "../i18n/messages.js";
import { taskText } from "../i18n/taskText.js";

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
  const { locale, t } = useI18n();
  const [confirmReset, setConfirmReset] = useState(false);
  const copy = sectionCopy(locale, section.id);
  const text = taskText(task, locale);

  return (
    <div className="workspace">
      <header className="work-head">
        <div>
          <p className="eyebrow">
            {section.index} · {copy.title}
          </p>
          <div className="title-row">
            <h1>{task.name}</h1>
            <span className={`status-chip ${status}`}>{t(`status.${status}`)}</span>
          </div>
          <p className="signature">
            {task.signature}
            {task.returns ? <span> → {task.returns}</span> : null}
          </p>
        </div>
        <div className="pager">
          <button type="button" className="btn ghost" onClick={onPrev} disabled={!onPrev}>
            {t("pager.prev")}
          </button>
          <span>
            {position.index}/{position.total}
          </span>
          <button type="button" className="btn ghost" onClick={onNext} disabled={!onNext}>
            {t("pager.next")}
          </button>
        </div>
      </header>

      <section className="brief">
        <p>{text.summary}</p>
        <dl>
          {text.input ? (
            <div>
              <dt>{t("field.input")}</dt>
              <dd>{text.input}</dd>
            </div>
          ) : null}
          {text.output ? (
            <div>
              <dt>{t("field.output")}</dt>
              <dd>{text.output}</dd>
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
                <span>{t("reset.ask")}</span>
                <button
                  type="button"
                  className="btn danger"
                  onClick={() => {
                    setConfirmReset(false);
                    onReset();
                  }}
                >
                  {t("reset.confirm")}
                </button>
                <button type="button" className="btn ghost" onClick={() => setConfirmReset(false)}>
                  {t("reset.cancel")}
                </button>
              </>
            ) : (
              <button type="button" className="text-button" onClick={() => setConfirmReset(true)}>
                {t("reset.code")}
              </button>
            )}
          </div>
        </div>
        <TestPanel task={task} result={result} running={running} manual={manual} onToggleManual={onToggleManual} />
      </div>
    </div>
  );
}
