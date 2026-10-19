/** Pull concrete call → result pairs from assert.equal / assert.deepEqual lines. */
export function extractExamples(tests, fnName, limit = 2) {
  const examples = [];
  const prefix = `${fnName}(`;

  for (const test of tests || []) {
    for (const raw of String(test.body || "").split("\n")) {
      const line = raw.trim();
      if (!line.startsWith("assert.")) continue;
      const callAt = line.indexOf(prefix);
      if (callAt < 0) continue;

      const open = callAt + prefix.length - 1;
      let depth = 0;
      let close = -1;
      for (let i = open; i < line.length; i += 1) {
        const ch = line[i];
        if (ch === "(") depth += 1;
        else if (ch === ")") {
          depth -= 1;
          if (depth === 0) {
            close = i;
            break;
          }
        } else if (ch === '"' || ch === "'" || ch === "`") {
          const quote = ch;
          i += 1;
          while (i < line.length) {
            if (line[i] === "\\") {
              i += 2;
              continue;
            }
            if (line[i] === quote) break;
            i += 1;
          }
        }
      }
      if (close < 0) continue;

      const call = line.slice(callAt, close + 1);
      let rest = line.slice(close + 1).trim();
      // Skip assert.equal(fn(x)[i], ...) — harder to read as a worked example.
      if (rest.startsWith("[")) continue;
      if (!rest.startsWith(",")) continue;

      let expected = rest.slice(1).trim();
      if (expected.endsWith(";")) expected = expected.slice(0, -1).trim();
      if (expected.endsWith(")")) expected = expected.slice(0, -1).trim();
      if (!expected) continue;

      examples.push({ call, expected });
      if (examples.length >= limit) return examples;
    }
  }

  return examples;
}
