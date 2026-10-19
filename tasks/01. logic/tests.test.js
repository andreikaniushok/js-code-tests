import test from "node:test";
import assert from "node:assert/strict";
import {
  fizzBuzzRange,
  isBalancedParens,
  digitalRoot,
  chunkString,
  safeParseInt,
  clamp,
  inRange,
  factorial,
  isPrime,
  sumRange,
  countDigits,
  reverseInt,
  parseIntegerStrict,
  toBase,
  fromBase,
  isLeapYear,
  maxOf3,
  xor,
  countSetBits32,
  isBalancedBrackets,
  evaluateRpn,
  rgbToHex,
  hexToRgb,
  isValidLuhn,
  compareSemver
} from "./solution.js";

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

test("clamp", () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-1, 0, 10), 0);
  assert.equal(clamp(99, 0, 10), 10);
  assert.equal(clamp(3, 3, 3), 3);
});

test("inRange", () => {
  assert.equal(inRange(3, 3, 3), true);
  assert.equal(inRange(0, 0, 10), true);
  assert.equal(inRange(10, 0, 10), true);
  assert.equal(inRange(-1, 0, 10), false);
  assert.equal(inRange(11, 0, 10), false);
});

test("factorial", () => {
  assert.equal(factorial(0), 1);
  assert.equal(factorial(1), 1);
  assert.equal(factorial(5), 120);
  assert.equal(factorial(10), 3628800);
});

test("isPrime", () => {
  assert.equal(isPrime(2), true);
  assert.equal(isPrime(3), true);
  assert.equal(isPrime(1), false);
  assert.equal(isPrime(0), false);
  assert.equal(isPrime(-7), false);
  assert.equal(isPrime(15), false);
  assert.equal(isPrime(17), true);
});

test("sumRange", () => {
  assert.equal(sumRange(1, 3), 6);
  assert.equal(sumRange(3, 1), 6);
  assert.equal(sumRange(5, 5), 5);
  assert.equal(sumRange(-2, 2), 0);
});

test("countDigits", () => {
  assert.equal(countDigits(0), 1);
  assert.equal(countDigits(3), 1);
  assert.equal(countDigits(99), 2);
  assert.equal(countDigits(-120), 3);
  assert.equal(countDigits(1000), 4);
});

test("reverseInt", () => {
  assert.equal(reverseInt(123), 321);
  assert.equal(reverseInt(-120), -21);
  assert.equal(reverseInt(0), 0);
  assert.equal(reverseInt(100), 1);
});

test("parseIntegerStrict", () => {
  assert.equal(parseIntegerStrict("42"), 42);
  assert.equal(parseIntegerStrict("-7"), -7);
  assert.equal(parseIntegerStrict("10px"), null);
  assert.equal(parseIntegerStrict(" 10"), null);
  assert.equal(parseIntegerStrict(""), null);
});

test("toBase", () => {
  assert.equal(toBase(0, 2), "0");
  assert.equal(toBase(10, 2), "1010");
  assert.equal(toBase(255, 16), "ff");
  assert.equal(toBase(36, 36), "10");
});

test("fromBase", () => {
  assert.equal(fromBase("1010", 2), 10);
  assert.equal(fromBase("ff", 16), 255);
  assert.equal(fromBase("10", 36), 36);
  assert.equal(fromBase("2", 2), null);
  assert.equal(fromBase("hello", 10), null);
});

test("isLeapYear", () => {
  assert.equal(isLeapYear(2000), true);
  assert.equal(isLeapYear(1900), false);
  assert.equal(isLeapYear(2024), true);
  assert.equal(isLeapYear(2023), false);
});

test("maxOf3", () => {
  assert.equal(maxOf3(1, 2, 3), 3);
  assert.equal(maxOf3(9, -1, 4), 9);
  assert.equal(maxOf3(-5, -2, -9), -2);
  assert.equal(maxOf3(3, 3, 3), 3);
});

test("xor", () => {
  assert.equal(xor(true, false), true);
  assert.equal(xor(1, 0), true);
  assert.equal(xor(true, true), false);
  assert.equal(xor(null, null), false);
  assert.equal(xor(0, ""), false);
});

test("countSetBits32", () => {
  assert.equal(countSetBits32(0), 0);
  assert.equal(countSetBits32(3), 2);
  assert.equal(countSetBits32(255), 8);
  assert.equal(countSetBits32(-1), 32);
});

test("isBalancedBrackets", () => {
  assert.equal(isBalancedBrackets("()[]{}"), true);
  assert.equal(isBalancedBrackets("([{}])"), true);
  assert.equal(isBalancedBrackets("(]"), false);
  assert.equal(isBalancedBrackets("a(b[c]d)e"), true);
  assert.equal(isBalancedBrackets("([)]"), false);
});

test("evaluateRpn", () => {
  assert.equal(evaluateRpn(["2", "3", "+"]), 5);
  assert.equal(evaluateRpn([4, 2, "/"]), 2);
  assert.equal(evaluateRpn(["2", "3", "4", "*", "+"]), 14);
  assert.equal(evaluateRpn(["5", "1", "2", "+", "4", "*", "+", "3", "-"]), 14);
});

test("rgbToHex", () => {
  assert.equal(rgbToHex(255, 255, 255), "#ffffff");
  assert.equal(rgbToHex(0, 0, 0), "#000000");
  assert.equal(rgbToHex(15, 128, 255), "#0f80ff");
  assert.equal(rgbToHex(-10, 300, 16), "#00ff10");
});

test("hexToRgb", () => {
  assert.deepEqual(hexToRgb("#fff"), { r: 255, g: 255, b: 255 });
  assert.deepEqual(hexToRgb("#ffffff"), { r: 255, g: 255, b: 255 });
  assert.deepEqual(hexToRgb("#0f80ff"), { r: 15, g: 128, b: 255 });
  assert.equal(hexToRgb("fff"), null);
  assert.equal(hexToRgb("#ff"), null);
});

test("isValidLuhn", () => {
  assert.equal(isValidLuhn("79927398713"), true);
  assert.equal(isValidLuhn("79927398714"), false);
  assert.equal(isValidLuhn("0"), true);
  assert.equal(isValidLuhn("18"), true);
});

test("compareSemver", () => {
  assert.equal(compareSemver("1.0.0", "1.0.0"), 0);
  assert.equal(compareSemver("1.0.0", "1.0.1"), -1);
  assert.equal(compareSemver("2.0.0", "1.9.9"), 1);
  assert.equal(compareSemver("1.2.0", "1.10.0"), -1);
});
