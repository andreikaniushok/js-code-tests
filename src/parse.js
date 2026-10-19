import { findClosing, maskNonCode, splitStatements } from "./syntax.js";

const identCache = new Map();

function identPattern(name) {
  let pattern = identCache.get(name);
  if (!pattern) {
    pattern = new RegExp(`\\b${name}\\b`);
    identCache.set(name, pattern);
  }
  return pattern;
}

export function mentionsIdent(source, name) {
  return identPattern(name).test(maskNonCode(source));
}

function plainJsdoc(jsdoc) {
  return jsdoc
    .split("\n")
    .map((line) => line.replace(/^\s*\*\s?/, ""))
    .join("\n")
    .trim();
}

function readField(text, label) {
  const match = text.match(new RegExp(`${label}:\\s*([\\s\\S]*?)(?=\\n(?:Task|Input|Output):|\\n@|$)`));
  return match ? match[1].replace(/\s+/g, " ").trim() : "";
}

function readReturnType(text) {
  const label = text.search(/@returns\s+\{/);
  if (label < 0) return "";
  const open = text.indexOf("{", label);
  let depth = 0;
  for (let index = open; index < text.length; index += 1) {
    if (text[index] === "{") depth += 1;
    else if (text[index] === "}") {
      depth -= 1;
      if (depth === 0) return text.slice(open + 1, index).trim();
    }
  }
  return "";
}

export function parseSolution(source, sectionId) {
  const text = source.replace(/\r\n/g, "\n");
  const header = /\/\*\*([\s\S]*?)\*\/\s*export\s+(async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g;
  const tasks = [];
  let match = header.exec(text);

  while (match) {
    const jsdoc = match[1];
    const asyncPrefix = match[2] || "";
    const name = match[3];
    const paramsOpen = header.lastIndex - 1;
    const paramsClose = findClosing(text, paramsOpen, "(", ")");
    const params = text.slice(paramsOpen + 1, paramsClose).trim();
    let cursor = paramsClose + 1;
    while (cursor < text.length && /\s/.test(text[cursor])) cursor += 1;
    if (text[cursor] !== "{") {
      throw new Error(`У ${sectionId}/${name} нет тела функции`);
    }
    const bodyClose = findClosing(text, cursor, "{", "}");
    const plain = plainJsdoc(jsdoc);
    const returns = readReturnType(plain);
    const starter = [
      "// @ts-check",
      `/**${jsdoc}*/`,
      `${asyncPrefix}function ${name}(${params}) {`,
      "",
      "}",
      "",
    ].join("\n");

    tasks.push({
      id: `${sectionId}/${name}`,
      sectionId,
      name,
      summary: readField(plain, "Task"),
      input: readField(plain, "Input"),
      output: readField(plain, "Output"),
      returns,
      signature: `${asyncPrefix}function ${name}(${params})`,
      starter,
      async: Boolean(asyncPrefix),
    });

    header.lastIndex = bodyClose + 1;
    match = header.exec(text);
  }

  return tasks;
}

function stripImports(source) {
  return source.replace(/^\s*import\s[\s\S]*?\sfrom\s+['"][^'"]+['"];?/gm, "\n");
}

export function parseTests(source) {
  const text = stripImports(source.replace(/\r\n/g, "\n"));
  const finder = /test\(\s*(['"])([\s\S]*?)\1\s*,\s*(async\s*)?\(\s*\)\s*=>\s*\{/g;
  const tests = [];
  let match = finder.exec(text);

  while (match) {
    const open = finder.lastIndex - 1;
    const close = findClosing(text, open, "{", "}");
    let end = close + 1;
    while (end < text.length && /\s/.test(text[end])) end += 1;
    if (text[end] === ")") end += 1;
    while (end < text.length && /\s/.test(text[end])) end += 1;
    if (text[end] === ";") end += 1;
    tests.push({
      name: match[2],
      async: Boolean(match[3]),
      body: text.slice(open + 1, close),
      start: match.index,
      end,
    });
    finder.lastIndex = end;
    match = finder.exec(text);
  }

  let prelude = text;
  for (const test of [...tests].reverse()) {
    prelude = prelude.slice(0, test.start) + prelude.slice(test.end);
  }

  return { prelude: prelude.trim(), tests };
}

function statementRole(statement, names) {
  const visible = maskNonCode(statement);
  const mentioned = names.filter((name) => identPattern(name).test(visible));
  if (mentioned.length) return { role: "anchor", names: mentioned };
  if (/^(const|let|var)\b/.test(statement)) return { role: "decl", names: [] };
  return { role: "follow", names: [] };
}

export function testsForFunction(parsed, fnName, allNames) {
  const selected = [];

  for (const test of parsed.tests) {
    const statements = splitStatements(test.body);
    const items = statements.map((statement) => ({ statement, ...statementRole(statement, allNames) }));
    if (!items.some((item) => item.names.includes(fnName))) continue;

    const preamble = [];
    let index = 0;
    while (index < items.length && items[index].role !== "anchor") {
      preamble.push(items[index].statement);
      index += 1;
    }

    const lines = [...preamble];
    let pending = [];
    let lastNames = [];
    let used = false;

    for (; index < items.length; index += 1) {
      const item = items[index];
      if (item.role === "decl") {
        pending.push(item.statement);
        continue;
      }
      if (item.role === "anchor") {
        if (item.names.includes(fnName)) {
          lines.push(...pending, item.statement);
          used = true;
        }
        pending = [];
        lastNames = item.names;
        continue;
      }
      if (lastNames.includes(fnName)) lines.push(item.statement);
    }

    if (!used) continue;
    const mentioned = allNames.filter((name) => mentionsIdent(`${test.name}\n${test.body}`, name));
    selected.push({
      name: mentioned.length > 1 ? fnName : test.name,
      async: test.async,
      body: lines.join("\n"),
    });
  }

  return selected;
}
