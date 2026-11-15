import test from "node:test";
import assert from "node:assert/strict";
import {
  isEvenBasic,
  maxOfTwo,
  absValue,
  greet,
  reverseChars,
  toLowerCaseBasic,
  countSpaces,
  capitalizeBasic,
  startsWithBasic,
  sumToN,
  isDivisible,
  percentOf,
  clamp01Basic,
  averageBasic,
  sumArrayBasic,
  maxInArray,
  includesBasic,
  doubleAll,
  positivesOnly,
  lastItem,
  firstN,
  rangeTo,
  getProp,
  sortedKeys,
  pickBasic,
  mergeBasic,
  constantBasic,
  makeAdder,
  applyTwice,
  uniqueBasic,
  hasDuplicate,
  frequencyBasic,
  utcYear,
  sameUtcDayBasic,
  onlyDigits,
  countVowelsBasic,
  linearSearch,
  isSortedBasic,
  delayValueBasic,
  sleepBasic,
} from "./solution.js";

test("isEvenBasic", () => {
  assert.equal(isEvenBasic(2), true);
  assert.equal(isEvenBasic(3), false);
  assert.equal(isEvenBasic(0), true);
  assert.equal(isEvenBasic(-4), true);
});

test("maxOfTwo", () => {
  assert.equal(maxOfTwo(1, 5), 5);
  assert.equal(maxOfTwo(9, 2), 9);
  assert.equal(maxOfTwo(-1, -3), -1);
});

test("absValue", () => {
  assert.equal(absValue(-7), 7);
  assert.equal(absValue(4), 4);
  assert.equal(absValue(0), 0);
});

test("greet", () => {
  assert.equal(greet("Ada"), "Hello, Ada!");
  assert.equal(greet(""), "Hello, !");
});

test("reverseChars", () => {
  assert.equal(reverseChars("abc"), "cba");
  assert.equal(reverseChars(""), "");
  assert.equal(reverseChars("a"), "a");
});

test("toLowerCaseBasic", () => {
  assert.equal(toLowerCaseBasic("HeLLo"), "hello");
  assert.equal(toLowerCaseBasic("ABC"), "abc");
});

test("countSpaces", () => {
  assert.equal(countSpaces("a b c"), 2);
  assert.equal(countSpaces("nospace"), 0);
  assert.equal(countSpaces("  "), 2);
});

test("capitalizeBasic", () => {
  assert.equal(capitalizeBasic("hello"), "Hello");
  assert.equal(capitalizeBasic("hELLO"), "HELLO");
  assert.equal(capitalizeBasic(""), "");
});

test("startsWithBasic", () => {
  assert.equal(startsWithBasic("hello", "he"), true);
  assert.equal(startsWithBasic("hello", "He"), false);
  assert.equal(startsWithBasic("hello", "hello"), true);
});

test("sumToN", () => {
  assert.equal(sumToN(3), 6);
  assert.equal(sumToN(0), 0);
  assert.equal(sumToN(1), 1);
});

test("isDivisible", () => {
  assert.equal(isDivisible(10, 5), true);
  assert.equal(isDivisible(10, 3), false);
  assert.equal(isDivisible(0, 7), true);
});

test("percentOf", () => {
  assert.equal(percentOf(25, 100), 25);
  assert.equal(percentOf(1, 4), 25);
  assert.equal(percentOf(5, 0), 0);
});

test("clamp01Basic", () => {
  assert.equal(clamp01Basic(-1), 0);
  assert.equal(clamp01Basic(0.5), 0.5);
  assert.equal(clamp01Basic(2), 1);
});

test("averageBasic", () => {
  assert.equal(averageBasic([2, 4, 6]), 4);
  assert.ok(Number.isNaN(averageBasic([])));
});

test("sumArrayBasic", () => {
  assert.equal(sumArrayBasic([1, 2, 3]), 6);
  assert.equal(sumArrayBasic([]), 0);
});

test("maxInArray", () => {
  assert.equal(maxInArray([1, 9, 3]), 9);
  assert.equal(maxInArray([-2, -8]), -2);
});

test("includesBasic", () => {
  assert.equal(includesBasic([1, 2, 3], 2), true);
  assert.equal(includesBasic([1, 2, 3], 5), false);
  assert.equal(includesBasic(["a"], "a"), true);
});

test("doubleAll", () => {
  const input = [1, 2, 3];
  assert.deepEqual(doubleAll(input), [2, 4, 6]);
  assert.deepEqual(input, [1, 2, 3]);
});

test("positivesOnly", () => {
  const input = [-1, 0, 2, 5];
  assert.deepEqual(positivesOnly(input), [2, 5]);
  assert.deepEqual(input, [-1, 0, 2, 5]);
});

test("lastItem", () => {
  assert.equal(lastItem([1, 2, 3]), 3);
  assert.equal(lastItem([]), undefined);
});

test("firstN", () => {
  const input = [1, 2, 3, 4];
  assert.deepEqual(firstN(input, 2), [1, 2]);
  assert.deepEqual(firstN(input, 10), [1, 2, 3, 4]);
  assert.deepEqual(input, [1, 2, 3, 4]);
});

test("rangeTo", () => {
  assert.deepEqual(rangeTo(3), [1, 2, 3]);
  assert.deepEqual(rangeTo(0), []);
  assert.deepEqual(rangeTo(1), [1]);
});

test("getProp", () => {
  assert.equal(getProp({ a: 1 }, "a"), 1);
  assert.equal(getProp({ a: 1 }, "b"), undefined);
});

test("sortedKeys", () => {
  assert.deepEqual(sortedKeys({ b: 1, a: 2, c: 3 }), ["a", "b", "c"]);
  assert.deepEqual(sortedKeys({}), []);
});

test("pickBasic", () => {
  assert.deepEqual(pickBasic({ a: 1, b: 2, c: 3 }, ["a", "c"]), { a: 1, c: 3 });
  assert.deepEqual(pickBasic({ a: 1 }, ["x"]), {});
});

test("mergeBasic", () => {
  assert.deepEqual(mergeBasic({ a: 1 }, { b: 2 }), { a: 1, b: 2 });
  assert.deepEqual(mergeBasic({ a: 1 }, { a: 9 }), { a: 9 });
});

test("constantBasic", () => {
  const fn = constantBasic(42);
  assert.equal(fn(), 42);
  assert.equal(fn(), 42);
});

test("makeAdder", () => {
  const add5 = makeAdder(5);
  assert.equal(add5(3), 8);
  assert.equal(add5(0), 5);
});

test("applyTwice", () => {
  assert.equal(applyTwice((x) => x + 1, 3), 5);
  assert.equal(applyTwice((x) => x * 2, 2), 8);
});

test("uniqueBasic", () => {
  assert.deepEqual(uniqueBasic([1, 2, 1, 3, 2]), [1, 2, 3]);
  assert.deepEqual(uniqueBasic(["a", "a"]), ["a"]);
});

test("hasDuplicate", () => {
  assert.equal(hasDuplicate([1, 2, 1]), true);
  assert.equal(hasDuplicate([1, 2, 3]), false);
  assert.equal(hasDuplicate([]), false);
});

test("frequencyBasic", () => {
  const map = frequencyBasic(["a", "b", "a"]);
  assert.ok(map instanceof Map);
  assert.equal(map.get("a"), 2);
  assert.equal(map.get("b"), 1);
});

test("utcYear", () => {
  assert.equal(utcYear(new Date(Date.UTC(2024, 0, 1))), 2024);
  assert.equal(utcYear(new Date(Date.UTC(1999, 11, 31))), 1999);
});

test("sameUtcDayBasic", () => {
  const a = new Date(Date.UTC(2024, 5, 10, 1, 0, 0));
  const b = new Date(Date.UTC(2024, 5, 10, 23, 0, 0));
  const c = new Date(Date.UTC(2024, 5, 11, 0, 0, 0));
  assert.equal(sameUtcDayBasic(a, b), true);
  assert.equal(sameUtcDayBasic(a, c), false);
});

test("onlyDigits", () => {
  assert.equal(onlyDigits("123"), true);
  assert.equal(onlyDigits("12a"), false);
  assert.equal(onlyDigits(""), false);
});

test("countVowelsBasic", () => {
  assert.equal(countVowelsBasic("Hello"), 2);
  assert.equal(countVowelsBasic("why"), 0);
  assert.equal(countVowelsBasic("AEIOU"), 5);
});

test("linearSearch", () => {
  assert.equal(linearSearch([4, 5, 6], 5), 1);
  assert.equal(linearSearch([4, 5, 6], 9), -1);
  assert.equal(linearSearch([], 1), -1);
});

test("isSortedBasic", () => {
  assert.equal(isSortedBasic([1, 2, 2, 5]), true);
  assert.equal(isSortedBasic([1, 3, 2]), false);
  assert.equal(isSortedBasic([]), true);
});

test("delayValueBasic", async () => {
  const start = Date.now();
  assert.equal(await delayValueBasic("ok", 15), "ok");
  assert.ok(Date.now() - start >= 10);
});

test("sleepBasic", async () => {
  const start = Date.now();
  await sleepBasic(15);
  assert.ok(Date.now() - start >= 10);
});
