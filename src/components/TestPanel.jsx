function formatTime(timestamp) {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

export function TestPanel({ task, result, running, onToggleManual, manual }) {
  const cases = result?.cases || [];
  const passed = cases.filter((item) => item.ok).length;

  return (
    <aside className="tests">
      <header className="tests-head">
        <div>
          <p className="eyebrow">Проверка</p>
          <h2>{task.tests.length ? "Автотесты" : "Самопроверка"}</h2>
        </div>
        {task.tests.length ? (
          <span className="count-pill">
            {cases.length ? `${passed}/${cases.length}` : task.tests.length}
          </span>
        ) : null}
      </header>

      {!task.tests.length ? (
        <div className="manual-card">
          <p>В исходном наборе для этой задачи нет автоматических проверок. Отметьте её, когда решение вас устраивает.</p>
          <button type="button" className={manual ? "btn ghost" : "btn primary"} onClick={onToggleManual}>
            {manual ? "Снять отметку" : "Считаю решённой"}
          </button>
        </div>
      ) : null}

      {result?.error ? <p className="banner bad">{result.error}</p> : null}
      {result?.stale ? <p className="banner warn">Код изменился после последнего прогона. Проверьте ещё раз.</p> : null}
      {result?.at && task.tests.length ? <p className="muted tight">Последний запуск в {formatTime(result.at)}</p> : null}

      <ol className="case-list">
        {cases.map((item) => (
          <li key={item.name} className={item.ok ? "case ok" : "case bad"}>
            <div className="case-row">
              <span className="case-mark">{item.ok ? "✓" : "×"}</span>
              <span className="case-name">{item.name}</span>
              <span className="case-ms">{item.ms} мс</span>
            </div>
            {item.error ? <p className="case-error">{item.error}</p> : null}
            {item.logs?.length ? (
              <pre className="case-log">{item.logs.join("\n")}</pre>
            ) : null}
          </li>
        ))}
      </ol>

      {running ? <p className="muted">Выполняю в отдельном потоке, чтобы цикл не заморозил страницу.</p> : null}
      {!running && task.tests.length && !cases.length ? (
        <p className="muted">Запустите проверку. Сочетание такое же, как запуск в редакторе: Ctrl+Enter.</p>
      ) : null}
    </aside>
  );
}
