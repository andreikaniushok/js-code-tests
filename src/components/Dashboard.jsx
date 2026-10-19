import { firstOpenTask, levelName } from "../skills.js";

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
  const ratio = summary.total ? summary.mastered / summary.total : 0;

  return (
    <div className="dashboard">
      <header className="hero">
        <div>
          <p className="eyebrow">Тренировка</p>
          <h1>Навыки, которые видно</h1>
          <p className="lede">
            {summary.total} задач в {summary.sections.length} разделах. Пишите решение в редакторе с подсказками,
            запускайте проверки и отмечайте то, что уже получается.
          </p>
          <div className="hero-actions">
            <button type="button" className="btn primary" onClick={() => onOpenTask(continueTarget.sectionId, continueTarget.taskName)}>
              {continueTarget.continued ? "Продолжить" : "Начать"}
            </button>
            <button type="button" className="btn ghost" onClick={onRunAll} disabled={Boolean(batch)}>
              {batch ? `${batch.label} · ${batch.done}/${batch.total}` : `Проверить задачи с тестами (${summary.tested})`}
            </button>
            {batch ? (
              <button type="button" className="btn ghost" onClick={batch.cancel}>
                Остановить
              </button>
            ) : null}
          </div>
        </div>
        <div className="hero-score">
          <Ring value={ratio} />
          <div>
            <strong>{Math.round(ratio * 100)}%</strong>
            <span>
              {summary.mastered} из {summary.total}
            </span>
          </div>
        </div>
      </header>

      <dl className="stat-row">
        <div>
          <dt>Зачтено тестами</dt>
          <dd>{summary.verified}</dd>
        </div>
        <div>
          <dt>Отмечено вручную</dt>
          <dd>{summary.manual}</dd>
        </div>
        <div>
          <dt>Задач с автотестами</dt>
          <dd>
            {summary.tested}
            <small>из {summary.total}</small>
          </dd>
        </div>
      </dl>

      <div className="card-grid">
        {summary.sections.map((section) => {
          const sectionRatio = section.total ? section.mastered / section.total : 0;
          const next = firstOpenTask(section);
          return (
            <button key={section.id} type="button" className="skill-card" onClick={() => onOpenTask(section.id, next.name)}>
              <div className="skill-card-top">
                <span className="idx">{section.index}</span>
                <span className="level">{levelName(sectionRatio)}</span>
              </div>
              <h2>{section.title}</h2>
              <p>{section.blurb}</p>
              <div className="mini-bar" aria-hidden="true">
                <span style={{ width: `${Math.round(sectionRatio * 100)}%` }} />
              </div>
              <footer>
                <span>
                  {section.mastered}/{section.total}
                </span>
                <span>{section.tested ? `${section.verified}/${section.tested} тестами` : "без автотестов"}</span>
              </footer>
            </button>
          );
        })}
      </div>

      <footer className="dash-foot">
        <button type="button" className="text-button" onClick={onResetAll}>
          Сбросить локальный прогресс
        </button>
      </footer>
    </div>
  );
}
