import { SUMMARIES_RU } from "./summaries.ru.js";
import { sectionCopy } from "./messages.js";

const INPUT_PHRASES = [
  ["expected integer n ≥ 0", "ожидается целое n ≥ 0"],
  ["expected integer size > 0", "ожидается целое size > 0"],
  ["expected integers", "ожидаются целые"],
  ["expected integer", "ожидается целое"],
  ["expected to have g", "ожидается флаг g"],
  ["expected 0..255", "ожидается 0..255"],
  ["you may clamp", "можно ограничить диапазон"],
  ["You may mutate it", "массив можно изменять"],
  ["sorted by keySelector", "отсортирован по keySelector"],
  ["rotated sorted", "циклически сдвинут и отсортирован"],
  ["sorted ascending", "отсортирован по возрастанию"],
  ["each is sorted", "каждый отсортирован"],
  ["single character", "один символ"],
  ["defaults to left", "по умолчанию равен left"],
  ["defaults to", "по умолчанию"],
  ["integer n ≥ 0", "целое n ≥ 0"],
  ["integer >= 1", "целое ≥ 1"],
  ["integer >= 0", "целое ≥ 0"],
  ["integer >=0", "целое ≥ 0"],
  ["integer > 0", "целое > 0"],
  [">=0 or >0", "≥ 0 или > 0"],
  ["digits", "цифры"],
  ["(sorted)", "(отсортирован)"],
  ["(integer)", "(целое)"],
  ["integer", "целое"],
];

const OUTPUT_EXACT = {
  "string.": "строка.",
  "number.": "число.",
  "boolean.": "логическое значение.",
  "any.": "любое значение.",
  "object.": "объект.",
  "void.": "без значения.",
  "Date.": "Date.",
  "R.": "R.",
  "T.": "T.",
  "V.": "V.",
  "number | null.": "число | null.",
  "number | undefined.": "число | undefined.",
  "Date | null.": "Date | null.",
  "any | undefined.": "любое | undefined.",
  "any (or undefined).": "любое (или undefined).",
  "any (same obj).": "тот же объект.",
  "number (index or -1).": "число (индекс или −1).",
  "number (new length).": "число (новая длина).",
  "number[] (new).": "number[] (новый).",
  "number[].": "массив чисел.",
  "string[].": "массив строк.",
  "any[].": "массив.",
  "T[].": "T[].",
  "T | undefined.": "T | undefined.",
  "-1 | 0 | 1.": "−1, 0 или 1.",
  "[number, number] | null.": "[number, number] | null.",
};

const OUTPUT_NOTES = [
  ["(new length)", "(новая длина)"],
  ["(same obj)", "(тот же объект)"],
  ["(same map)", "(та же карта)"],
  ["(array of pairs)", "(массив пар)"],
  ["(index or -1)", "(индекс или −1)"],
  ["(in fns order)", "(в порядке функций)"],
  ["(in original order)", "(в исходном порядке)"],
  ["(or undefined)", "(или undefined)"],
  ["(new)", "(новый)"],
];

function applyPhrases(text, phrases) {
  let next = text;
  for (const [from, to] of phrases) next = next.replaceAll(from, to);
  return next;
}

export function translateInput(text) {
  if (!text) return "";
  return applyPhrases(text, INPUT_PHRASES)
    .replace(/ — number(?![A-Za-z[])/g, " — число")
    .replace(/ — string(?![A-Za-z[])/g, " — строка")
    .replace(/ — any(?![A-Za-z[])/g, " — любое")
    .replace(/ — object(?![A-Za-z])/g, " — объект");
}

export function translateOutput(text) {
  if (!text) return "";
  const trimmed = text.trim();
  if (OUTPUT_EXACT[trimmed]) return OUTPUT_EXACT[trimmed];
  return applyPhrases(trimmed, OUTPUT_NOTES);
}

export function taskText(task, locale) {
  if (locale !== "ru") {
    return { summary: task.summary, input: task.input, output: task.output };
  }
  return {
    summary: SUMMARIES_RU[task.id] || task.summary,
    input: translateInput(task.input),
    output: translateOutput(task.output),
  };
}

function replaceDocLine(code, labels, label, value) {
  const pattern = new RegExp(`(\\*\\s*)(?:${labels.join("|")}):\\s*[^\\n]*`);
  return code.replace(pattern, (_, star) => `${star}${label}: ${value}`);
}

/** Rewrite Task/Input/Output (or Задача/Вход/Выход) lines in source to the active locale. */
export function localizeCodeDocs(code, task, locale) {
  const text = taskText(task, locale);
  const russian = locale === "ru";
  let next = String(code || "");
  next = replaceDocLine(next, ["Task", "Задача"], russian ? "Задача" : "Task", text.summary);
  next = replaceDocLine(next, ["Input", "Вход"], russian ? "Вход" : "Input", text.input);
  next = replaceDocLine(next, ["Output", "Выход"], russian ? "Выход" : "Output", text.output);
  if (russian) {
    // English Note lines are already folded into the Russian summary.
    next = next.replace(/\n\s*\*\s*Note:[^\n]*/g, "");
  }
  return next;
}

export function localizedStarter(task, locale) {
  if (locale !== "ru") return task.starter;
  return localizeCodeDocs(task.starter, task, "ru");
}

/** Drop description text so language switches do not count as code edits. */
export function stripDocDescriptions(code) {
  return String(code || "")
    .replace(/\*\s*(?:Task|Задача):\s*[^\n]*/g, "* Task:")
    .replace(/\*\s*(?:Input|Вход):\s*[^\n]*/g, "* Input:")
    .replace(/\*\s*(?:Output|Выход):\s*[^\n]*/g, "* Output:")
    .replace(/\n\s*\*\s*Note:[^\n]*/g, "");
}

export function taskSearchHaystack(task) {
  const ru = sectionCopy("ru", task.sectionId);
  const en = sectionCopy("en", task.sectionId);
  return [task.name, task.summary, SUMMARIES_RU[task.id] || "", ru.title, en.title, ru.blurb, en.blurb]
    .join(" ")
    .toLowerCase();
}
