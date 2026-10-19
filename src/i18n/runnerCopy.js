export const RUNNER_COPY = {
  ru: {
    expected: (expected, actual) => `ожидалось ${expected}, получено ${actual}`,
    notEqual: (actual) => `значения не должны совпадать: ${actual}`,
    expectedTruthy: (actual) => `ожидалось истинное значение, получено ${actual}`,
    messageMismatch: (message, expected) => `сообщение ${message} не совпало с ${expected}`,
    expectedThrow: "ожидалось исключение",
    unknown: "Неизвестная ошибка",
    syntax: (message) => `Синтаксическая ошибка: ${message}`,
    startup: (message) => `Ошибка при запуске: ${message}`,
    timeout: "Превышено время теста (5 с)",
    hung: "Похоже, выполнение зависло. Проверьте циклы и ожидающие промисы.",
    worker: "Сбой изолированного выполнения",
  },
  en: {
    expected: (expected, actual) => `expected ${expected}, got ${actual}`,
    notEqual: (actual) => `values must not be equal: ${actual}`,
    expectedTruthy: (actual) => `expected a truthy value, got ${actual}`,
    messageMismatch: (message, expected) => `message ${message} did not match ${expected}`,
    expectedThrow: "expected an exception",
    unknown: "Unknown error",
    syntax: (message) => `Syntax error: ${message}`,
    startup: (message) => `Failed to start: ${message}`,
    timeout: "Test timed out (5 s)",
    hung: "Execution looks stuck. Check loops and pending promises.",
    worker: "Isolated run failed",
  },
};

export function runnerCopy(locale) {
  return RUNNER_COPY[locale === "en" ? "en" : "ru"];
}
