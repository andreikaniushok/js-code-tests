function previousWord(source, index) {
  let j = index - 1;
  while (j >= 0 && /\s/.test(source[j])) j -= 1;
  if (j < 0) return { char: "", word: "" };
  const char = source[j];
  if (!/[\w$]/.test(char)) return { char, word: "" };
  let k = j;
  while (k >= 0 && /[\w$]/.test(source[k])) k -= 1;
  return { char, word: source.slice(k + 1, j + 1) };
}

function canStartRegex(source, index) {
  const { char, word } = previousWord(source, index);
  if (!char) return true;
  if ("([{,;:=!&|?+-*%^~<>".includes(char)) return true;
  return ["return", "typeof", "case", "throw", "void", "delete", "in", "of", "yield", "await"].includes(word);
}

function consumeRegex(source, index) {
  let i = index + 1;
  let inClass = false;
  while (i < source.length) {
    const char = source[i];
    if (char === "\\") {
      i += 2;
      continue;
    }
    if (char === "\n") return i;
    if (inClass) {
      if (char === "]") inClass = false;
      i += 1;
      continue;
    }
    if (char === "[") {
      inClass = true;
      i += 1;
      continue;
    }
    if (char === "/") {
      i += 1;
      while (i < source.length && /[a-z]/i.test(source[i])) i += 1;
      return i;
    }
    i += 1;
  }
  return i;
}

function scanEvents(source, from, onEvent) {
  const frames = [{ mode: "code" }];
  let braceDepth = 0;
  let i = from;

  while (i < source.length) {
    const char = source[i];
    const next = source[i + 1];
    const frame = frames[frames.length - 1];

    if (frame.mode === "line") {
      if (char === "\n") frames.pop();
      i += 1;
      continue;
    }
    if (frame.mode === "block") {
      if (char === "*" && next === "/") {
        frames.pop();
        i += 2;
        continue;
      }
      i += 1;
      continue;
    }
    if (frame.mode === "s" || frame.mode === "d") {
      if (char === "\\") {
        i += 2;
        continue;
      }
      if ((frame.mode === "s" && char === "'") || (frame.mode === "d" && char === '"')) frames.pop();
      i += 1;
      continue;
    }
    if (frame.mode === "t") {
      if (char === "\\") {
        i += 2;
        continue;
      }
      if (char === "`") {
        frames.pop();
        i += 1;
        continue;
      }
      if (char === "$" && next === "{") {
        braceDepth += 1;
        frames.push({ mode: "code", closeAt: braceDepth });
        const keep = onEvent({ char: "{", index: i + 1 });
        i += 2;
        if (keep === false) return;
        continue;
      }
      i += 1;
      continue;
    }

    if (char === "/" && next === "/") {
      frames.push({ mode: "line" });
      i += 2;
      continue;
    }
    if (char === "/" && next === "*") {
      frames.push({ mode: "block" });
      i += 2;
      continue;
    }
    if (char === "'") {
      frames.push({ mode: "s" });
      i += 1;
      continue;
    }
    if (char === '"') {
      frames.push({ mode: "d" });
      i += 1;
      continue;
    }
    if (char === "`") {
      frames.push({ mode: "t" });
      i += 1;
      continue;
    }
    if (char === "/" && canStartRegex(source, i)) {
      i = consumeRegex(source, i);
      continue;
    }

    if (char === "{") braceDepth += 1;
    else if (char === "}") {
      if (frame.closeAt === braceDepth) frames.pop();
      braceDepth -= 1;
    }

    const keep = onEvent({ char, index: i });
    if (keep === false) return;
    i += 1;
  }
}

export function findClosing(source, openIndex, openChar, closeChar) {
  let depth = 1;
  let found = -1;
  scanEvents(source, openIndex + 1, ({ char, index }) => {
    if (char === openChar) depth += 1;
    else if (char === closeChar) {
      depth -= 1;
      if (depth === 0) {
        found = index;
        return false;
      }
    }
    return true;
  });
  if (found < 0) {
    throw new Error(`Не удалось найти «${closeChar}» для позиции ${openIndex}`);
  }
  return found;
}

export function splitStatements(source) {
  const parts = [];
  let start = 0;
  let paren = 0;
  let bracket = 0;
  let brace = 0;

  scanEvents(source, 0, ({ char, index }) => {
    if (char === "(") paren += 1;
    else if (char === ")") paren -= 1;
    else if (char === "[") bracket += 1;
    else if (char === "]") bracket -= 1;
    else if (char === "{") brace += 1;
    else if (char === "}") brace -= 1;
    else if (char === ";" && paren === 0 && bracket === 0 && brace === 0) {
      parts.push(source.slice(start, index + 1));
      start = index + 1;
    }
    return true;
  });

  if (source.slice(start).trim()) parts.push(source.slice(start));
  return parts.map((part) => part.trim()).filter(Boolean);
}

export function maskNonCode(source) {
  const chars = [...source];
  for (let i = 0; i < chars.length; i += 1) {
    if (chars[i] !== "\n") chars[i] = " ";
  }
  scanEvents(source, 0, ({ char, index }) => {
    chars[index] = char;
    return true;
  });
  return chars.join("");
}
