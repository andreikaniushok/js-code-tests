import { createAssert } from "./assert.js";

export function prepareUserCode(code) {
  return String(code || "")
    .replace(/^\s*export\s+default\s+/gm, "")
    .replace(/^\s*export\s+(async\s+function\b)/gm, "$1")
    .replace(/^\s*export\s+(function\b)/gm, "$1")
    .replace(/^\s*export\s+(const|let|var|class)\b/gm, "$1");
}

function formatError(error) {
  if (!error) return "Неизвестная ошибка";
  const name = error.name || "Error";
  const message = error.message || String(error);
  return name === "AssertionError" ? message : `${name}: ${message}`;
}

function formatLog(args) {
  return args
    .map((value) => {
      if (typeof value === "string") return value;
      if (typeof value === "undefined") return "undefined";
      if (typeof value === "function") return value.name ? `[function ${value.name}]` : "[function]";
      if (value instanceof Error) return `${value.name}: ${value.message}`;
      try {
        return JSON.stringify(value);
      } catch {
        return String(value);
      }
    })
    .join(" ");
}

export async function runProgram({ prelude = "", tests = [], userCode = "" }) {
  const logs = [];
  const pieces = [
    "'use strict';",
    "const console = {",
    "  log: (...args) => logs.push(args),",
    "  info: (...args) => logs.push(args),",
    "  warn: (...args) => logs.push(args),",
    "  error: (...args) => logs.push(args),",
    "  debug: (...args) => logs.push(args),",
    "};",
    prelude,
    userCode,
    ...tests.map((test) => {
      const asyncPrefix = test.async ? "async " : "";
      return `register(${JSON.stringify(test.name)}, ${asyncPrefix}() => {\n${test.body}\n});`;
    }),
  ];
  const source = pieces.join("\n");
  const AsyncFunction = Object.getPrototypeOf(async function asyncFactory() {}).constructor;

  let factory;
  try {
    factory = new AsyncFunction("assert", "register", "logs", source);
  } catch (error) {
    return { error: `Синтаксическая ошибка: ${error.message}`, results: [] };
  }

  const bucket = [];
  try {
    await factory(createAssert(), (name, fn) => bucket.push({ name, fn }), logs);
  } catch (error) {
    return { error: `Ошибка при запуске: ${error.message}`, results: [] };
  }

  const results = [];
  for (const test of bucket) {
    logs.length = 0;
    const started = performance.now();
    try {
      await Promise.race([
        Promise.resolve().then(() => test.fn()),
        new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Превышено время теста (5 с)")), 5000);
        }),
      ]);
      results.push({
        name: test.name,
        ok: true,
        ms: Math.round(performance.now() - started),
        logs: logs.map(formatLog),
      });
    } catch (error) {
      results.push({
        name: test.name,
        ok: false,
        ms: Math.round(performance.now() - started),
        error: formatError(error),
        logs: logs.map(formatLog),
      });
    }
  }

  return { results };
}
