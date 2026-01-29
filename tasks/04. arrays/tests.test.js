import test from "node:test";
import assert from "node:assert/strict";
import { flattenDepth, rotate, zip, slidingWindow, uniqueBy } from "./solution.js";

test("flattenDepth", () => {
  const a = [1, [2, [3]]];
  const r0 = flattenDepth(a, 0);
  assert.deepEqual(r0, a);
  assert.notEqual(r0, a);
  assert.deepEqual(flattenDepth(a, 1), [1, 2, [3]]);
  assert.deepEqual(flattenDepth(a, 2), [1, 2, 3]);
});

test("rotate", () => {
  const a = [1, 2, 3, 4, 5];
  assert.deepEqual(rotate(a, 2), [4, 5, 1, 2, 3]);
  assert.deepEqual(rotate([1, 2, 3], -1), [2, 3, 1]);
  assert.deepEqual(rotate([1, 2, 3], 10), [3, 1, 2]);
  assert.deepEqual(a, [1, 2, 3, 4, 5]);
});

test("zip", () => {
  assert.deepEqual(zip([1, 2], ["a", "b", "c"]), [
    [1, "a"],
    [2, "b"]
  ]);
  assert.deepEqual(zip([], [1]), []);
});

test("slidingWindow", () => {
  assert.deepEqual(slidingWindow([1, 2, 3, 4], 3), [
    [1, 2, 3],
    [2, 3, 4]
  ]);
  assert.deepEqual(slidingWindow([1, 2], 3), []);
});

test("uniqueBy", () => {
  const input = [{ id: "a", v: 1 }, { id: "b", v: 2 }, { id: "a", v: 3 }];
  assert.deepEqual(uniqueBy(input, (x) => x.id), [{ id: "a", v: 1 }, { id: "b", v: 2 }]);
});

