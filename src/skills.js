import { hashCode } from "./storage.js";
import { localizeCodeDocs, localizedStarter, stripDocDescriptions } from "./i18n/taskText.js";

export function codeFingerprint(code) {
  return hashCode(stripDocDescriptions(code));
}

export function isStarterCode(task, code) {
  return stripDocDescriptions(code) === stripDocDescriptions(task.starter);
}

export function taskCode(task, state, locale = "ru") {
  const saved = state.code[task.id];
  if (!saved || isStarterCode(task, saved)) return localizedStarter(task, locale);
  return localizeCodeDocs(saved, task, locale);
}

export function resultMatchesCode(task, state, locale, result) {
  if (!result) return false;
  const saved = state.code[task.id] ?? task.starter;
  const code = taskCode(task, state, locale);
  const fingerprint = codeFingerprint(code);
  return result.hash === fingerprint || result.hash === hashCode(saved) || result.hash === hashCode(code);
}

export function getStatus(task, state, locale = "ru") {
  const code = taskCode(task, state, locale);
  const dirty = !isStarterCode(task, code);
  const result = state.results[task.id];
  const same = resultMatchesCode(task, state, locale, result);
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
  if (ratio >= 1) return "mastered";
  if (ratio >= 0.7) return "confident";
  if (ratio >= 0.35) return "practicing";
  if (ratio > 0) return "started";
  return "untouched";
}

export function summarize(sections, state, locale = "ru") {
  const decorated = sections.map((section) => {
    let mastered = 0;
    let verified = 0;
    let manual = 0;
    let tested = 0;
    const tasks = section.tasks.map((task) => {
      const status = getStatus(task, state, locale);
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
