import { useEffect, useState } from "react";
import { levelName } from "../skills.js";

export function Sidebar({ summary, route, query, onQuery, onDashboard, onOpenTask }) {
  const [openIds, setOpenIds] = useState(() => (route.sectionId ? { [route.sectionId]: true } : {}));
  const ratio = summary.total ? summary.mastered / summary.total : 0;
  const needle = query.trim().toLowerCase();

  useEffect(() => {
    if (route.sectionId) {
      setOpenIds((current) => ({ ...current, [route.sectionId]: true }));
    }
  }, [route.sectionId]);

  let matches = 0;

  return (
    <aside className="sidebar">
      <button type="button" className="brand" onClick={onDashboard}>
        <span className="mark" aria-hidden="true">
          {"{ }"}
        </span>
        <span>
          <strong>Полигон</strong>
          <small>Навыки JavaScript</small>
        </span>
      </button>

      <label className="search">
        <span className="sr-only">Поиск задачи</span>
        <input value={query} onChange={(event) => onQuery(event.target.value)} placeholder="Найти задачу" spellCheck="false" />
      </label>

      <button type="button" className={route.name === "dashboard" ? "nav-link active" : "nav-link"} onClick={onDashboard}>
        <span>Обзор навыков</span>
        <span className="nav-meta">
          {summary.mastered}/{summary.total}
        </span>
      </button>
      <div className="mini-bar" aria-hidden="true">
        <span style={{ width: `${Math.round(ratio * 100)}%` }} />
      </div>

      <div className="section-scroll">
        {summary.sections.map((section) => {
          const visible = needle
            ? section.tasks.filter((task) => `${task.name} ${task.summary} ${section.title}`.toLowerCase().includes(needle))
            : section.tasks;
          if (needle && !visible.length) return null;
          matches += visible.length;
          const open = Boolean(needle) || openIds[section.id];
          const sectionRatio = section.total ? section.mastered / section.total : 0;
          return (
            <section key={section.id} className="side-section">
              <button
                type="button"
                className="side-section-head"
                aria-expanded={open}
                onClick={() => setOpenIds((current) => ({ ...current, [section.id]: !current[section.id] }))}
              >
                <span className="idx">{section.index}</span>
                <span className="side-title">
                  <strong>{section.title}</strong>
                  <small>
                    {section.mastered}/{section.total} · {levelName(sectionRatio)}
                  </small>
                </span>
              </button>
              <div className="mini-bar thin" aria-hidden="true">
                <span style={{ width: `${Math.round(sectionRatio * 100)}%` }} />
              </div>
              {open ? (
                <ul className="task-list">
                  {visible.map((task) => {
                    const active = route.name === "task" && route.sectionId === section.id && route.taskName === task.name;
                    return (
                      <li key={task.id}>
                        <button
                          type="button"
                          className={active ? "task-link active" : "task-link"}
                          onClick={() => onOpenTask(section.id, task.name)}
                          title={task.summary}
                        >
                          <i className={`dot ${task.status}`} />
                          <span>{task.name}</span>
                          {task.tests.length ? <em>тест</em> : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </section>
          );
        })}
        {needle && matches === 0 ? <p className="muted pad">Ничего не найдено</p> : null}
      </div>
    </aside>
  );
}
