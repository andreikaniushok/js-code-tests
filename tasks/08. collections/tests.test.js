import test from "node:test";
import assert from "node:assert/strict";
import { tally, firstUnique, isSuperset, mergeMapsSum, invertMapOfSets } from "./solution.js";

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

