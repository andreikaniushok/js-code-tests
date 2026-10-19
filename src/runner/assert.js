function preview(value) {
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "undefined") return "undefined";
  if (typeof value === "bigint") return `${value}n`;
  if (typeof value === "function") return value.name ? `[function ${value.name}]` : "[function]";
  if (value instanceof Error) return `${value.name}: ${value.message}`;
  if (value instanceof Date) return value.toISOString();
  if (value instanceof Map) {
    return `Map(${[...value.entries()].map(([key, item]) => `${preview(key)} => ${preview(item)}`).join(", ")})`;
  }
  if (value instanceof Set) return `Set(${[...value].map((item) => preview(item)).join(", ")})`;
  try {
    const text = JSON.stringify(value);
    return text.length > 400 ? `${text.slice(0, 400)}…` : text;
  } catch {
    return String(value);
  }
}

function assertionError(message) {
  const error = new Error(message);
  error.name = "AssertionError";
  return error;
}

function deepEqual(left, right, seen = new Map()) {
  if (Object.is(left, right)) return true;
  if (typeof left !== "object" || typeof right !== "object" || left === null || right === null) return false;
  if (seen.get(left) === right) return true;
  seen.set(left, right);

  if (left instanceof Date || right instanceof Date) {
    return left instanceof Date && right instanceof Date && left.getTime() === right.getTime();
  }
  if (left instanceof RegExp || right instanceof RegExp) {
    return left instanceof RegExp && right instanceof RegExp && String(left) === String(right);
  }
  if (left instanceof Map || right instanceof Map) {
    if (!(left instanceof Map) || !(right instanceof Map) || left.size !== right.size) return false;
    for (const [key, value] of left) {
      let found = false;
      for (const [otherKey, otherValue] of right) {
        if (deepEqual(key, otherKey, seen) && deepEqual(value, otherValue, seen)) {
          found = true;
          break;
        }
      }
      if (!found) return false;
    }
    return true;
  }
  if (left instanceof Set || right instanceof Set) {
    if (!(left instanceof Set) || !(right instanceof Set) || left.size !== right.size) return false;
    const used = new Set();
    for (const value of left) {
      let index = 0;
      let found = false;
      for (const other of right) {
        if (!used.has(index) && deepEqual(value, other, seen)) {
          used.add(index);
          found = true;
          break;
        }
        index += 1;
      }
      if (!found) return false;
    }
    return true;
  }
  if (Array.isArray(left) || Array.isArray(right)) {
    if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) return false;
    for (let index = 0; index < left.length; index += 1) {
      if (!deepEqual(left[index], right[index], seen)) return false;
    }
    return true;
  }

  const leftKeys = Reflect.ownKeys(left);
  const rightKeys = Reflect.ownKeys(right);
  if (leftKeys.length !== rightKeys.length) return false;
  for (const key of leftKeys) {
    if (!rightKeys.includes(key)) return false;
    if (!deepEqual(left[key], right[key], seen)) return false;
  }
  return true;
}

export function createAssert(copy) {
  const text = copy || {
    expected: (expected, actual) => `ожидалось ${expected}, получено ${actual}`,
    notEqual: (actual) => `значения не должны совпадать: ${actual}`,
    expectedTruthy: (actual) => `ожидалось истинное значение, получено ${actual}`,
    messageMismatch: (message, expected) => `сообщение ${message} не совпало с ${expected}`,
    expectedThrow: "ожидалось исключение",
  };
  return {
    equal(actual, expected, message) {
      if (!Object.is(actual, expected)) {
        throw assertionError(message || text.expected(preview(expected), preview(actual)));
      }
    },
    notEqual(actual, expected, message) {
      if (Object.is(actual, expected)) {
        throw assertionError(message || text.notEqual(preview(actual)));
      }
    },
    deepEqual(actual, expected, message) {
      if (!deepEqual(actual, expected)) {
        throw assertionError(message || text.expected(preview(expected), preview(actual)));
      }
    },
    ok(value, message) {
      if (!value) throw assertionError(message || text.expectedTruthy(preview(value)));
    },
    async rejects(block, expected) {
      try {
        await block();
      } catch (error) {
        if (expected instanceof RegExp) {
          const message = `${error && error.message ? error.message : ""} ${error}`;
          if (!expected.test(message)) {
            throw assertionError(text.messageMismatch(preview(error && error.message), expected));
          }
        }
        return;
      }
      throw assertionError(text.expectedThrow);
    },
  };
}
