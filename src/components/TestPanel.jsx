import { useI18n } from "../i18n/LocaleContext.jsx";

function formatTime(timestamp, locale) {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleTimeString(locale === "en" ? "en-GB" : "ru-RU", { hour: "2-digit", minute: "2-digit" });
}

export function TestPanel({ task, result, running, onToggleManual, manual }) {
  const { locale, t } = useI18n();
  const cases = result?.cases || [];
  const passed = cases.filter((item) => item.ok).length;

  return (
    <aside className="tests">
      <header className="tests-head">
        <div>
          <p className="eyebrow">{t("tests.eyebrow")}</p>
          <h2>{task.tests.length ? t("tests.auto") : t("tests.manual")}</h2>
        </div>
        {task.tests.length ? (
          <span className="count-pill">
            {cases.length ? `${passed}/${cases.length}` : task.tests.length}
          </span>
        ) : null}
      </header>

      {!task.tests.length ? (
        <div className="manual-card">
          <p>{t("tests.manualCopy")}</p>
          <button type="button" className={manual ? "btn ghost" : "btn primary"} onClick={onToggleManual}>
            {manual ? t("tests.unmark") : t("tests.mark")}
          </button>
        </div>
      ) : null}

      {result?.error ? <p className="banner bad">{result.error}</p> : null}
      {result?.stale ? <p className="banner warn">{t("tests.stale")}</p> : null}
      {result?.at && task.tests.length ? <p className="muted tight">{t("tests.lastRun", { time: formatTime(result.at, locale) })}</p> : null}

      <ol className="case-list">
        {cases.map((item) => (
          <li key={item.name} className={item.ok ? "case ok" : "case bad"}>
            <div className="case-row">
              <span className="case-mark">{item.ok ? "✓" : "×"}</span>
              <span className="case-name">{item.name}</span>
              <span className="case-ms">{t("tests.ms", { ms: item.ms })}</span>
            </div>
            {item.error ? <p className="case-error">{item.error}</p> : null}
            {item.logs?.length ? (
              <pre className="case-log">{item.logs.join("\n")}</pre>
            ) : null}
          </li>
        ))}
      </ol>

      {running ? <p className="muted">{t("tests.running")}</p> : null}
      {!running && task.tests.length && !cases.length ? <p className="muted">{t("tests.idle")}</p> : null}
    </aside>
  );
}
