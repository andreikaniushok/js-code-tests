import test from "node:test";
import assert from "node:assert/strict";
import {
  tally,
  firstUnique,
  isSuperset,
  mergeMapsSum,
  invertMapOfSets,
  setUnion,
  setIntersection,
  setDifference,
  toggleInSet,
  mapGetOrSet,
  groupByToMap,
  countByToMap,
  invertMap,
  mapKeys,
  mapValues,
  filterMap,
  filterSet,
  takeFromSet,
  toMultiMap,
  multiMapAdd,
  multiMapDelete,
  frequencyTopN,
  stableUnique,
  indexBy,
  zipToMap,
} from "./solution.js";

test("tally", () => {
  const m = tally(["a", "b", "a"]);
  assert.ok(m instanceof Map);
  assert.equal(m.get("a"), 2);
  assert.equal(m.get("b"), 1);
});

test("firstUnique", () => {
  assert.equal(firstUnique([1, 2, 2, 3, 1]), 3);
  assert.equal(firstUnique(["a", "a"]), undefined);
});

test("isSuperset", () => {
  assert.equal(isSuperset(new Set([1, 2, 3]), new Set([2, 3])), true);
  assert.equal(isSuperset(new Set([1, 2]), new Set([2, 3])), false);
});

test("mergeMapsSum", () => {
  const m = mergeMapsSum(
    new Map([["a", 1], ["b", 2]]),
    new Map([["b", 5], ["c", 10]])
  );
  assert.deepEqual([...m.entries()].sort(), [["a", 1], ["b", 7], ["c", 10]]);
});

test("invertMapOfSets", () => {
  const input = new Map([
    ["a", new Set([1, 2])],
    ["b", new Set([2])]
  ]);
  const out = invertMapOfSets(input);
  assert.ok(out instanceof Map);
  assert.deepEqual(new Set(out.get(1)), new Set(["a"]));
  assert.deepEqual(new Set(out.get(2)), new Set(["a", "b"]));
});

test("setUnion", () => {
  const out = setUnion(new Set([1, 2]), new Set([2, 3]));
  assert.deepEqual([...out].sort(), [1, 2, 3]);
  assert.deepEqual([...setUnion(new Set(), new Set([1]))], [1]);
});

test("setIntersection", () => {
  const out = setIntersection(new Set([1, 2, 3]), new Set([2, 3, 4]));
  assert.deepEqual([...out].sort(), [2, 3]);
  assert.deepEqual([...setIntersection(new Set([1]), new Set([2]))], []);
});

test("setDifference", () => {
  const out = setDifference(new Set([1, 2, 3]), new Set([2]));
  assert.deepEqual([...out].sort(), [1, 3]);
  assert.deepEqual([...setDifference(new Set([1]), new Set([1, 2]))], []);
});

test("toggleInSet", () => {
  const s = new Set([1, 2]);
  const out = toggleInSet(s, 2);
  assert.equal(out, s);
  assert.deepEqual([...s].sort(), [1]);
  toggleInSet(s, 3);
  assert.ok(s.has(3));
});

test("mapGetOrSet", () => {
  const m = new Map([["a", 1]]);
  assert.equal(mapGetOrSet(m, "a", () => 99), 1);
  assert.equal(mapGetOrSet(m, "b", () => 2), 2);
  assert.equal(m.get("b"), 2);
});

test("groupByToMap", () => {
  const out = groupByToMap([1, 2, 3, 4], (n) => (n % 2 === 0 ? "even" : "odd"));
  assert.deepEqual(out.get("odd"), [1, 3]);
  assert.deepEqual(out.get("even"), [2, 4]);
  assert.equal(groupByToMap([], (x) => x).size, 0);
});

test("countByToMap", () => {
  const out = countByToMap(["aa", "b", "cc", "d"], (s) => s.length);
  assert.equal(out.get(1), 2);
  assert.equal(out.get(2), 2);
  assert.equal(countByToMap([], (x) => x).size, 0);
});

test("invertMap", () => {
  const out = invertMap(new Map([["a", 1], ["b", 2], ["c", 1]]));
  assert.deepEqual([...out.entries()].sort((a, b) => a[0] - b[0]), [[1, "c"], [2, "b"]]);
  assert.equal(invertMap(new Map()).size, 0);
});

test("mapKeys", () => {
  const out = mapKeys(new Map([["a", 1], ["b", 2]]), (k) => k.toUpperCase());
  assert.deepEqual([...out.entries()], [["A", 1], ["B", 2]]);
  assert.deepEqual(
    [...mapKeys(new Map([[1, "x"]]), (k, v) => `${k}:${v}`).entries()],
    [["1:x", "x"]]
  );
});

test("mapValues", () => {
  const out = mapValues(new Map([["a", 1], ["b", 2]]), (v) => v * 10);
  assert.deepEqual([...out.entries()], [["a", 10], ["b", 20]]);
  assert.deepEqual(
    [...mapValues(new Map([["k", 3]]), (v, k) => `${k}${v}`).entries()],
    [["k", "k3"]]
  );
});

test("filterMap", () => {
  const out = filterMap(new Map([["a", 1], ["b", 2], ["c", 3]]), (_k, v) => v % 2 === 1);
  assert.deepEqual([...out.entries()], [["a", 1], ["c", 3]]);
  assert.equal(filterMap(new Map([["x", 1]]), () => false).size, 0);
});

test("filterSet", () => {
  const out = filterSet(new Set([1, 2, 3, 4]), (n) => n % 2 === 0);
  assert.deepEqual([...out].sort(), [2, 4]);
  assert.deepEqual([...filterSet(new Set([1]), () => false)], []);
});

test("takeFromSet", () => {
  const s = new Set(["a", "b", "c"]);
  assert.deepEqual(takeFromSet(s, 2), ["a", "b"]);
  assert.deepEqual(takeFromSet(s, 0), []);
  assert.deepEqual(takeFromSet(s, 10), ["a", "b", "c"]);
});

test("toMultiMap", () => {
  const out = toMultiMap(["aa", "b", "cc"], (s) => s.length);
  assert.deepEqual([...out.get(2)].sort(), ["aa", "cc"]);
  assert.deepEqual([...out.get(1)], ["b"]);
  assert.equal(toMultiMap([], (x) => x).size, 0);
});

test("multiMapAdd", () => {
  const m = new Map();
  const out = multiMapAdd(m, "k", 1);
  assert.equal(out, m);
  assert.ok(m.get("k").has(1));
  multiMapAdd(m, "k", 2);
  assert.deepEqual([...m.get("k")].sort(), [1, 2]);
});

test("multiMapDelete", () => {
  const m = new Map([["k", new Set([1, 2])]]);
  const out = multiMapDelete(m, "k", 1);
  assert.equal(out, m);
  assert.deepEqual([...m.get("k")], [2]);
  multiMapDelete(m, "k", 2);
  assert.equal(m.has("k"), false);
});

test("frequencyTopN", () => {
  assert.deepEqual(frequencyTopN(["a", "b", "a", "c", "a", "b"], 2), [
    { value: "a", count: 3 },
    { value: "b", count: 2 },
  ]);
  assert.deepEqual(frequencyTopN([1, 1, 2], 0), []);
  assert.deepEqual(frequencyTopN([], 3), []);
});

test("stableUnique", () => {
  assert.deepEqual(stableUnique([1, 2, 1, 3, 2]), [1, 2, 3]);
  assert.deepEqual(stableUnique(["a", "a", "b"]), ["a", "b"]);
  assert.deepEqual(stableUnique([]), []);
});

test("indexBy", () => {
  const out = indexBy(
    [{ id: 1, n: "a" }, { id: 2, n: "b" }, { id: 1, n: "c" }],
    (x) => x.id
  );
  assert.deepEqual(out.get(1), { id: 1, n: "c" });
  assert.deepEqual(out.get(2), { id: 2, n: "b" });
  assert.equal(indexBy([], (x) => x).size, 0);
});

test("zipToMap", () => {
  assert.deepEqual(
    [...zipToMap(["a", "b"], [1, 2, 3]).entries()],
    [["a", 1], ["b", 2]]
  );
  assert.deepEqual([...zipToMap(["a", "b", "c"], [1]).entries()], [["a", 1]]);
  assert.equal(zipToMap([], []).size, 0);
});
