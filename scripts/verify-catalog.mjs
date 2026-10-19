import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SECTIONS } from "../src/sections.js";
import { assembleSection } from "../src/assemble.js";
import { parseTests } from "../src/parse.js";
import { runProgram } from "../src/runner/runProgram.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function fail(message) {
  failures.push(message);
  console.error(message);
}

const catalog = SECTIONS.map((section) => {
  const solution = fs.readFileSync(path.join(root, "tasks", section.dir, "solution.js"), "utf8");
  const tests = fs.readFileSync(path.join(root, "tasks", section.dir, "tests.test.js"), "utf8");
  const parsed = parseTests(tests);
  const rawCount = tests.match(/\btest\(/g)?.length || 0;
  if (parsed.tests.length !== rawCount) {
    fail(`${section.id}: разобрано ${parsed.tests.length} тестов, в файле ${rawCount}`);
  }
  return assembleSection(section, solution, tests);
});

const total = catalog.reduce((sum, section) => sum + section.tasks.length, 0);
if (total !== 310) fail(`ожидалось 310 задач, получено ${total}`);

for (const section of catalog) {
  const names = new Set();
  for (const task of section.tasks) {
    if (names.has(task.name)) fail(`${section.id}: повтор ${task.name}`);
    names.add(task.name);
    if (!task.summary) fail(`${task.id}: пустое условие`);
    try {
      new Function(task.starter);
    } catch (error) {
      fail(`${task.id}: каркас не парсится: ${error.message}`);
    }
    for (const test of task.tests) {
      const wrapped = test.async
        ? `async function _(){\n${test.body}\n}`
        : `${section.prelude}\n${test.body}`;
      try {
        new Function(wrapped);
      } catch (error) {
        fail(`${task.id} / ${test.name}: тело теста не парсится: ${error.message}\n${test.body}`);
      }
    }
  }
}

function task(sectionId, name) {
  const section = catalog.find((item) => item.id === sectionId);
  return { section, task: section.tasks.find((item) => item.name === name) };
}

function expectIncludes(sectionId, name, snippets, forbidden = []) {
  const body = task(sectionId, name).task.tests.map((item) => item.body).join("\n");
  for (const snippet of snippets) {
    if (!body.includes(snippet)) fail(`${sectionId}/${name}: нет фрагмента ${snippet}`);
  }
  for (const snippet of forbidden) {
    if (body.includes(snippet)) fail(`${sectionId}/${name}: лишний фрагмент ${snippet}`);
  }
}

expectIncludes("algorithms", "bubbleSort", ["bubbleSort", "const a", "const b"], ["insertionSort", "quickSort"]);
expectIncludes("algorithms", "insertionSort", ["insertionSort", "const a"], ["bubbleSort", "const b"]);
expectIncludes("dates", "formatDateUTC", ["formatDateUTC"], ["parseDateUTC"]);
expectIncludes("dates", "parseDateUTC", ["parseDateUTC", "toISOString"], ["formatDateUTC"]);
expectIncludes("objects", "pick", ["pick("], ["omit("]);
expectIncludes("arrays", "zip", ['[1, "a"]', "[2, \"b\"]"]);

async function check(sectionId, name, userCode, shouldPass) {
  const found = task(sectionId, name);
  const outcome = await runProgram({
    prelude: found.section.prelude,
    tests: found.task.tests,
    userCode,
  });
  const ok = !outcome.error && outcome.results.length > 0 && outcome.results.every((item) => item.ok);
  if (ok !== shouldPass) {
    fail(
      `${sectionId}/${name}: ожидался ${shouldPass ? "успех" : "провал"}, получено ${JSON.stringify(outcome)}`,
    );
  }
}

await check(
  "logic",
  "fizzBuzzRange",
  `function fizzBuzzRange(n) {
    const out = [];
    for (let i = 1; i <= n; i++) {
      if (i % 15 === 0) out.push("FizzBuzz");
      else if (i % 3 === 0) out.push("Fizz");
      else if (i % 5 === 0) out.push("Buzz");
      else out.push(i);
    }
    return out;
  }`,
  true,
);
await check("logic", "fizzBuzzRange", "function fizzBuzzRange(){ return []; }", false);
await check("logic", "fizzBuzzRange", task("logic", "fizzBuzzRange").task.starter, false);

await check(
  "arrays",
  "zip",
  `function zip(a, b) {
    const out = [];
    const n = Math.min(a.length, b.length);
    for (let i = 0; i < n; i++) out.push([a[i], b[i]]);
    return out;
  }`,
  true,
);

await check(
  "algorithms",
  "bubbleSort",
  `function bubbleSort(arr) {
    const a = [...arr];
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a.length - 1 - i; j++) {
        if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
    return a;
  }`,
  true,
);

await check(
  "dates",
  "formatDateUTC",
  `function formatDateUTC(date) {
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, "0");
    const d = String(date.getUTCDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }`,
  true,
);

await check(
  "dates",
  "parseDateUTC",
  `function parseDateUTC(s) {
    const match = /^(\\d{4})-(\\d{2})-(\\d{2})$/.exec(s);
    if (!match) return null;
    return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  }`,
  true,
);

await check(
  "objects",
  "pick",
  `function pick(obj, keys) {
    const out = {};
    for (const key of keys) if (Object.prototype.hasOwnProperty.call(obj, key)) out[key] = obj[key];
    return out;
  }`,
  true,
);

await check(
  "async",
  "sleep",
  `async function sleep(ms) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }`,
  true,
);

await check(
  "async",
  "withTimeout",
  `async function withTimeout(promise, ms) {
    let timer;
    const timeout = new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error("Timeout")), ms);
    });
    try {
      return await Promise.race([promise, timeout]);
    } finally {
      clearTimeout(timer);
    }
  }`,
  true,
);

const broken = await runProgram({
  prelude: "",
  tests: [{ name: "syntax", async: false, body: "return;" }],
  userCode: "function oops( {",
});
if (!broken.error) fail(`синтаксическая ошибка не поймана: ${JSON.stringify(broken)}`);

if (failures.length) {
  console.error(`\n${failures.length} проблем`);
  process.exit(1);
}

const tested = catalog.reduce((sum, section) => sum + section.tasks.filter((item) => item.tests.length).length, 0);
console.log(`ok: ${total} задач, с тестами ${tested}`);
