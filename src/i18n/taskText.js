import { SUMMARIES_RU } from "./summaries.ru.js";
import { SUMMARIES_EN } from "./summaries.en.js";
import { sectionCopy } from "./messages.js";

const INPUT_PHRASES_RU = [
  ["expected integer n ≥ 0", "целое число ≥ 0"],
  ["expected integer size > 0", "целое число > 0"],
  ["expected integers", "целые числа"],
  ["expected integer", "целое число"],
  ["expected to have g", "с флагом g"],
  ["expected 0..255", "от 0 до 255"],
  ["you may clamp", "можно ограничить диапазон"],
  ["You may mutate it", "массив можно изменять"],
  ["sorted by keySelector", "отсортирован по keySelector"],
  ["rotated sorted", "циклически сдвинут и отсортирован"],
  ["sorted ascending", "отсортирован по возрастанию"],
  ["each is sorted", "каждый отсортирован"],
  ["single character", "один символ"],
  ["defaults to left", "по умолчанию равен left"],
  ["defaults to", "по умолчанию"],
  ["integer n ≥ 0", "целое число ≥ 0"],
  ["integer >= 1", "целое число ≥ 1"],
  ["integer >= 0", "целое число ≥ 0"],
  ["integer >=0", "целое число ≥ 0"],
  ["integer > 0", "целое число > 0"],
  [">=0 or >0", "≥ 0 или > 0"],
  ["digits", "только цифры"],
  ["(sorted)", "(отсортирован)"],
  ["(integer)", "(целое)"],
  ["integer", "целое"],
];

const INPUT_PHRASES_EN = [
  ["expected integer n ≥ 0", "non-negative integer"],
  ["expected integer size > 0", "integer greater than 0"],
  ["expected integers", "integers"],
  ["expected integer", "integer"],
  ["expected to have g", "must have the g flag"],
  ["expected 0..255", "from 0 to 255"],
  ["you may clamp", "you may clamp into range"],
  ["You may mutate it", "you may mutate the array"],
  ["sorted by keySelector", "sorted by keySelector"],
  ["rotated sorted", "rotated sorted array"],
  ["sorted ascending", "sorted ascending"],
  ["each is sorted", "each array is sorted"],
  ["single character", "single character"],
  ["defaults to left", "defaults to left"],
  ["defaults to", "defaults to"],
  ["integer n ≥ 0", "non-negative integer"],
  ["integer >= 1", "integer ≥ 1"],
  ["integer >= 0", "non-negative integer"],
  ["integer >=0", "non-negative integer"],
  ["integer > 0", "integer greater than 0"],
  [">=0 or >0", "≥ 0 or > 0"],
  ["(sorted)", "(sorted)"],
  ["(integer)", "(integer)"],
];

const OUTPUT_EXACT_RU = {
  "string.": "строка",
  "number.": "число",
  "boolean.": "true или false",
  "any.": "любое значение",
  "object.": "объект",
  "void.": "ничего не возвращает",
  "Date.": "дата (Date)",
  "number | null.": "число или null",
  "number | undefined.": "число или undefined",
  "Date | null.": "дата или null",
  "any | undefined.": "значение или undefined",
  "any (or undefined).": "значение или undefined",
  "any (same obj).": "тот же объект",
  "number (index or -1).": "индекс или −1",
  "number (new length).": "новая длина массива",
  "number[] (new).": "новый массив чисел",
  "number[].": "массив чисел",
  "string[].": "массив строк",
  "any[].": "массив",
  "-1 | 0 | 1.": "−1, 0 или 1",
  "Array<string|number>.": "массив чисел и строк",
};

const OUTPUT_EXACT_EN = {
  "string.": "a string",
  "number.": "a number",
  "boolean.": "true or false",
  "any.": "any value",
  "object.": "an object",
  "void.": "nothing (undefined)",
  "Date.": "a Date",
  "number | null.": "a number or null",
  "number | undefined.": "a number or undefined",
  "Date | null.": "a Date or null",
  "any | undefined.": "a value or undefined",
  "any (or undefined).": "a value or undefined",
  "any (same obj).": "the same object",
  "number (index or -1).": "an index, or -1",
  "number (new length).": "the new array length",
  "number[] (new).": "a new number array",
  "number[].": "an array of numbers",
  "string[].": "an array of strings",
  "any[].": "an array",
  "-1 | 0 | 1.": "-1, 0, or 1",
  "Array<string|number>.": "an array of numbers and strings",
};

const OUTPUT_NOTES_RU = [
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

const OUTPUT_NOTES_EN = [
  ["(new length)", "(new length)"],
  ["(same obj)", "(same object)"],
  ["(same map)", "(same map)"],
  ["(array of pairs)", "(array of pairs)"],
  ["(index or -1)", "(index or -1)"],
  ["(in fns order)", "(in function order)"],
  ["(in original order)", "(in original order)"],
  ["(or undefined)", "(or undefined)"],
  ["(new)", "(new array)"],
];

function applyPhrases(text, phrases) {
  let next = text;
  for (const [from, to] of phrases) next = next.replaceAll(from, to);
  return next;
}

export function translateInput(text, locale = "ru") {
  if (!text) return "";
  const trimmed = text.replace(/\.$/, "");
  if (locale === "en") {
    return applyPhrases(trimmed, INPUT_PHRASES_EN)
      .replace(/ — number \(([^)]+)\)/g, " — $1")
      .replace(/ — string \(([^)]+)\)/g, " — string, $1");
  }
  return applyPhrases(trimmed, INPUT_PHRASES_RU)
    .replace(/ — number(?![A-Za-z[])/g, " — число")
    .replace(/ — string(?![A-Za-z[])/g, " — строка")
    .replace(/ — any(?![A-Za-z[])/g, " — любое")
    .replace(/ — object(?![A-Za-z])/g, " — объект")
    .replace(/ — число \(([^)]+)\)/g, " — $1")
    .replace(/ — строка \(([^)]+)\)/g, " — строка, $1");
}

export function translateOutput(text, locale = "ru") {
  if (!text) return "";
  const trimmed = text.trim();
  const exact = locale === "en" ? OUTPUT_EXACT_EN : OUTPUT_EXACT_RU;
  if (exact[trimmed]) return exact[trimmed];
  const notes = locale === "en" ? OUTPUT_NOTES_EN : OUTPUT_NOTES_RU;
  return applyPhrases(trimmed.replace(/\.$/, ""), notes);
}

export function taskText(task, locale) {
  const russian = locale === "ru";
  const summary = russian
    ? SUMMARIES_RU[task.id] || task.summary
    : SUMMARIES_EN[task.id] || task.summary;
  return {
    summary,
    input: translateInput(task.input, locale),
    output: translateOutput(task.output, locale),
    examples: task.examples || [],
  };
}

function replaceDocLine(code, labels, label, value) {
  const pattern = new RegExp(`(\\*\\s*)(?:${labels.join("|")}):\\s*[^\\n]*`);
  return code.replace(pattern, (_, star) => `${star}${label}: ${value}`);
}

function upsertExampleLines(code, examples, locale) {
  let next = String(code || "").replace(/\n\s*\*\s*(?:Example|Пример):[^\n]*/g, "");
  if (!examples.length) return next;
  const label = locale === "ru" ? "Пример" : "Example";
  const block = examples.map((item) => ` * ${label}: ${item.call} → ${item.expected}`).join("\n");
  if (/\n\s*\*\s*@param/.test(next)) {
    return next.replace(/\n(\s*\*\s*@param)/, `\n${block}\n$1`);
  }
  if (/\n\s*\*\//.test(next)) {
    return next.replace(/\n(\s*\*\/)/, `\n${block}\n$1`);
  }
  return next;
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
    next = next.replace(/\n\s*\*\s*Note:[^\n]*/g, "");
  }
  next = upsertExampleLines(next, text.examples, locale);
  return next;
}

export function localizedStarter(task, locale) {
  return localizeCodeDocs(task.starter, task, locale);
}

/** Drop description text so language switches do not count as code edits. */
export function stripDocDescriptions(code) {
  return String(code || "")
    .replace(/\*\s*(?:Task|Задача):\s*[^\n]*/g, "* Task:")
    .replace(/\*\s*(?:Input|Вход):\s*[^\n]*/g, "* Input:")
    .replace(/\*\s*(?:Output|Выход):\s*[^\n]*/g, "* Output:")
    .replace(/\n\s*\*\s*(?:Example|Пример):[^\n]*/g, "")
    .replace(/\n\s*\*\s*Note:[^\n]*/g, "");
}

export function taskSearchHaystack(task) {
  const ru = sectionCopy("ru", task.sectionId);
  const en = sectionCopy("en", task.sectionId);
  return [
    task.name,
    task.summary,
    SUMMARIES_RU[task.id] || "",
    SUMMARIES_EN[task.id] || "",
    ru.title,
    en.title,
    ru.blurb,
    en.blurb,
  ]
    .join(" ")
    .toLowerCase();
}
