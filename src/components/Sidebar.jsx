import { useEffect, useState } from "react";
import { levelName } from "../skills.js";
import { useI18n } from "../i18n/LocaleContext.jsx";
import { sectionCopy } from "../i18n/messages.js";
import { taskSearchHaystack, taskText } from "../i18n/taskText.js";

export function Sidebar({ summary, route, query, onQuery, onDashboard, onOpenTask }) {
  const { locale, setLocale, t } = useI18n();
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
          <strong>{t("brand.name")}</strong>
          <small>{t("brand.tagline")}</small>
        </span>
      </button>

      <div className="lang-switch" role="group" aria-label={t("brand.tagline")}>
        <button type="button" className={locale === "ru" ? "active" : ""} onClick={() => setLocale("ru")}>
          RU
        </button>
        <button type="button" className={locale === "en" ? "active" : ""} onClick={() => setLocale("en")}>
          EN
        </button>
      </div>

      <label className="search">
        <span className="sr-only">{t("search.label")}</span>
        <input value={query} onChange={(event) => onQuery(event.target.value)} placeholder={t("search.placeholder")} spellCheck="false" />
      </label>

      <button type="button" className={route.name === "dashboard" ? "nav-link active" : "nav-link"} onClick={onDashboard}>
        <span>{t("nav.overview")}</span>
        <span className="nav-meta">
          {summary.mastered}/{summary.total}
        </span>
      </button>
      <div className="mini-bar" aria-hidden="true">
        <span style={{ width: `${Math.round(ratio * 100)}%` }} />
      </div>

      <div className="section-scroll">
        {summary.sections.map((section) => {
          const copy = sectionCopy(locale, section.id);
          const visible = needle
            ? section.tasks.filter((task) => taskSearchHaystack(task).includes(needle))
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
                  <strong>{copy.title}</strong>
                  <small>
                    {section.mastered}/{section.total} · {t(`level.${levelName(sectionRatio)}`)}
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
                          title={taskText(task, locale).summary}
                        >
                          <i className={`dot ${task.status}`} />
                          <span>{task.name}</span>
                          {task.tests.length ? <em>{t("badge.test")}</em> : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </section>
          );
        })}
        {needle && matches === 0 ? <p className="muted pad">{t("search.empty")}</p> : null}
      </div>
    </aside>
  );
}
