import { firstOpenTask, levelName } from "../skills.js";
import { useI18n } from "../i18n/LocaleContext.jsx";
import { sectionCopy } from "../i18n/messages.js";

function Ring({ value }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value);
  return (
    <svg className="ring" viewBox="0 0 140 140" aria-hidden="true">
      <circle className="ring-track" cx="70" cy="70" r={radius} />
      <circle
        className="ring-value"
        cx="70"
        cy="70"
        r={radius}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  );
}

export function Dashboard({ summary, onOpenTask, onRunAll, onResetAll, batch, continueTarget }) {
  const { locale, t } = useI18n();
  const ratio = summary.total ? summary.mastered / summary.total : 0;

  return (
    <div className="dashboard">
      <header className="hero">
        <div>
          <p className="eyebrow">{t("dash.eyebrow")}</p>
          <h1>{t("dash.title")}</h1>
          <p className="lede">
            {t("dash.lede", { total: summary.total, sections: summary.sections.length })}
          </p>
          <div className="hero-actions">
            <button type="button" className="btn primary" onClick={() => onOpenTask(continueTarget.sectionId, continueTarget.taskName)}>
              {continueTarget.continued ? t("dash.continue") : t("dash.start")}
            </button>
            <button type="button" className="btn ghost" onClick={onRunAll} disabled={Boolean(batch)}>
              {batch ? `${batch.label} · ${batch.done}/${batch.total}` : t("dash.runAll", { count: summary.tested })}
            </button>
            {batch ? (
              <button type="button" className="btn ghost" onClick={batch.cancel}>
                {t("dash.stop")}
              </button>
            ) : null}
          </div>
        </div>
        <div className="hero-score">
          <Ring value={ratio} />
          <div>
            <strong>{Math.round(ratio * 100)}%</strong>
            <span>
              {t("dash.score", { mastered: summary.mastered, total: summary.total })}
            </span>
          </div>
        </div>
      </header>

      <dl className="stat-row">
        <div>
          <dt>{t("stat.verified")}</dt>
          <dd>{summary.verified}</dd>
        </div>
        <div>
          <dt>{t("stat.manual")}</dt>
          <dd>{summary.manual}</dd>
        </div>
        <div>
          <dt>{t("stat.tested")}</dt>
          <dd>
            {summary.tested}
            <small>{t("stat.of", { total: summary.total })}</small>
          </dd>
        </div>
      </dl>

      <div className="card-grid">
        {summary.sections.map((section) => {
          const sectionRatio = section.total ? section.mastered / section.total : 0;
          const next = firstOpenTask(section);
          const copy = sectionCopy(locale, section.id);
          return (
            <button key={section.id} type="button" className="skill-card" onClick={() => onOpenTask(section.id, next.name)}>
              <div className="skill-card-top">
                <span className="idx">{section.index}</span>
                <span className="level">{t(`level.${levelName(sectionRatio)}`)}</span>
              </div>
              <h2>{copy.title}</h2>
              <p>{copy.blurb}</p>
              <div className="mini-bar" aria-hidden="true">
                <span style={{ width: `${Math.round(sectionRatio * 100)}%` }} />
              </div>
              <footer>
                <span>
                  {section.mastered}/{section.total}
                </span>
                <span>
                  {section.tested
                    ? t("section.byTests", { verified: section.verified, tested: section.tested })
                    : t("section.noTests")}
                </span>
              </footer>
            </button>
          );
        })}
      </div>

      <footer className="dash-foot">
        <button type="button" className="text-button" onClick={onResetAll}>
          {t("dash.reset")}
        </button>
      </footer>
    </div>
  );
}
