import test from "node:test";
import assert from "node:assert/strict";
import { fizzBuzzRange, isBalancedParens, digitalRoot, chunkString, safeParseInt } from "./solution.js";

test("fizzBuzzRange", () => {
  assert.deepEqual(fizzBuzzRange(5), [1, 2, "Fizz", 4, "Buzz"]);
  assert.equal(fizzBuzzRange(15)[14], "FizzBuzz");
});

test("isBalancedParens", () => {
  assert.equal(isBalancedParens("()"), true);
  assert.equal(isBalancedParens("(a(b)c)"), true);
  assert.equal(isBalancedParens("(()"), false);
  assert.equal(isBalancedParens(") ("), false);
});

test("digitalRoot", () => {
  assert.equal(digitalRoot(12345), 6);
  assert.equal(digitalRoot(0), 0);
  assert.equal(digitalRoot(99999), 9);
});

test("chunkString", () => {
  assert.deepEqual(chunkString("abcdef", 2), ["ab", "cd", "ef"]);
  assert.deepEqual(chunkString("abc", 2), ["ab", "c"]);
  assert.deepEqual(chunkString("", 3), []);
});

test("safeParseInt", () => {
  assert.equal(safeParseInt("10", 0), 10);
  assert.equal(safeParseInt("-5", 0), -5);
  assert.equal(safeParseInt("10px", 7), 7);
  assert.equal(safeParseInt(" 10", 7), 7);
});

