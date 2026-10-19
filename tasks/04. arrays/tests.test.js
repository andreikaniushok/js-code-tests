import test from "node:test";
import assert from "node:assert/strict";
import {
  flattenDepth,
  rotate,
  zip,
  slidingWindow,
  uniqueBy,
  chunk,
  compact,
  take,
  drop,
  first,
  last,
  sum,
  partition,
  groupBy,
  countBy,
  difference,
  intersection,
  union,
  unique,
  transpose,
  deepFlat,
  insertAt,
  removeAt,
  rangeArray,
  sortBy
} from "./solution.js";

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

test("chunk", () => {
  const a = [1, 2, 3, 4, 5];
  assert.deepEqual(chunk(a, 2), [[1, 2], [3, 4], [5]]);
  assert.deepEqual(chunk([1, "a"], 3), [[1, "a"]]);
  assert.deepEqual(chunk([], 2), []);
  assert.deepEqual(a, [1, 2, 3, 4, 5]);
});

test("compact", () => {
  const a = [0, 1, false, "", null, undefined, NaN, "hi", 2];
  assert.deepEqual(compact(a), [1, "hi", 2]);
  assert.deepEqual(compact([true, "x"]), [true, "x"]);
  assert.deepEqual(a, [0, 1, false, "", null, undefined, NaN, "hi", 2]);
});

test("take", () => {
  const a = [1, 2, 3, 4];
  assert.deepEqual(take(a, 2), [1, 2]);
  assert.deepEqual(take(a, 0), []);
  assert.deepEqual(take(a, 10), [1, 2, 3, 4]);
  assert.deepEqual(a, [1, 2, 3, 4]);
});

test("drop", () => {
  const a = [1, 2, 3, 4];
  assert.deepEqual(drop(a, 2), [3, 4]);
  assert.deepEqual(drop(a, 0), [1, 2, 3, 4]);
  assert.deepEqual(drop(a, 10), []);
  assert.deepEqual(a, [1, 2, 3, 4]);
});

test("first", () => {
  assert.equal(first([1, 2, 3]), 1);
  assert.equal(first(["a"]), "a");
  assert.equal(first([]), undefined);
});

test("last", () => {
  assert.equal(last([1, 2, 3]), 3);
  assert.equal(last(["a"]), "a");
  assert.equal(last([]), undefined);
});

test("sum", () => {
  const a = [1, 2, 3, 4];
  assert.equal(sum(a), 10);
  assert.equal(sum([]), 0);
  assert.equal(sum([-2, 5]), 3);
  assert.deepEqual(a, [1, 2, 3, 4]);
});

test("partition", () => {
  const a = [1, 2, 3, 4, 5];
  assert.deepEqual(partition(a, (x) => x % 2 === 0), [
    [2, 4],
    [1, 3, 5]
  ]);
  assert.deepEqual(partition(["a", "b", "c"], (_x, i) => i === 0), [["a"], ["b", "c"]]);
  assert.deepEqual(a, [1, 2, 3, 4, 5]);
});

test("groupBy", () => {
  const a = [
    { t: "a", v: 1 },
    { t: "b", v: 2 },
    { t: "a", v: 3 }
  ];
  assert.deepEqual(groupBy(a, (x) => x.t), {
    a: [
      { t: "a", v: 1 },
      { t: "a", v: 3 }
    ],
    b: [{ t: "b", v: 2 }]
  });
  assert.deepEqual(groupBy([], (x) => x), {});
  assert.deepEqual(a, [
    { t: "a", v: 1 },
    { t: "b", v: 2 },
    { t: "a", v: 3 }
  ]);
});

test("countBy", () => {
  const a = ["a", "b", "a", "c", "b", "a"];
  assert.deepEqual(countBy(a, (x) => x), { a: 3, b: 2, c: 1 });
  assert.deepEqual(
    countBy([{ n: 1 }, { n: 2 }, { n: 1 }], (x) => String(x.n)),
    { "1": 2, "2": 1 }
  );
  assert.deepEqual(a, ["a", "b", "a", "c", "b", "a"]);
});

test("difference", () => {
  const a = [1, 2, 3, 2];
  const b = [2, 4];
  assert.deepEqual(difference(a, b), [1, 3]);
  assert.deepEqual(difference([1, 1, 2], [1]), [2]);
  assert.deepEqual(difference([], [1]), []);
  assert.deepEqual(a, [1, 2, 3, 2]);
});

test("intersection", () => {
  const a = [1, 2, 2, 3, 4];
  assert.deepEqual(intersection(a, [2, 3, 5]), [2, 3]);
  assert.deepEqual(intersection([1, 2], [3]), []);
  assert.deepEqual(intersection(["x", "y"], ["y", "x", "y"]), ["x", "y"]);
  assert.deepEqual(a, [1, 2, 2, 3, 4]);
});

test("union", () => {
  const a = [1, 2, 2];
  assert.deepEqual(union(a, [2, 3, 3]), [1, 2, 3]);
  assert.deepEqual(union([], [1, 1]), [1]);
  assert.deepEqual(union(["a"], ["b", "a"]), ["a", "b"]);
  assert.deepEqual(a, [1, 2, 2]);
});

test("unique", () => {
  const a = [1, 2, 1, 3, 2, 4];
  assert.deepEqual(unique(a), [1, 2, 3, 4]);
  assert.deepEqual(unique([]), []);
  assert.deepEqual(unique(["a", "a", "b"]), ["a", "b"]);
  assert.deepEqual(a, [1, 2, 1, 3, 2, 4]);
});

test("transpose", () => {
  const m = [
    [1, 2, 3],
    [4, 5, 6]
  ];
  assert.deepEqual(transpose(m), [
    [1, 4],
    [2, 5],
    [3, 6]
  ]);
  assert.deepEqual(transpose([[1], [2], [3]]), [[1, 2, 3]]);
  assert.deepEqual(transpose([]), []);
  assert.deepEqual(m, [
    [1, 2, 3],
    [4, 5, 6]
  ]);
});

test("deepFlat", () => {
  const a = [1, [2, [3, [4]]], 5];
  assert.deepEqual(deepFlat(a), [1, 2, 3, 4, 5]);
  assert.deepEqual(deepFlat([]), []);
  assert.deepEqual(deepFlat([1, 2]), [1, 2]);
  assert.deepEqual(a, [1, [2, [3, [4]]], 5]);
});

test("insertAt", () => {
  const a = [1, 2, 3];
  assert.deepEqual(insertAt(a, 1, 9), [1, 9, 2, 3]);
  assert.deepEqual(insertAt(a, 0, 0), [0, 1, 2, 3]);
  assert.deepEqual(insertAt(a, 3, 4), [1, 2, 3, 4]);
  assert.deepEqual(a, [1, 2, 3]);
});

test("removeAt", () => {
  const a = [1, 2, 3, 4];
  assert.deepEqual(removeAt(a, 1), [1, 3, 4]);
  assert.deepEqual(removeAt(a, 0), [2, 3, 4]);
  assert.deepEqual(removeAt([1], 0), []);
  assert.deepEqual(a, [1, 2, 3, 4]);
});

test("rangeArray", () => {
  assert.deepEqual(rangeArray(0, 5), [0, 1, 2, 3, 4]);
  assert.deepEqual(rangeArray(0, 10, 2), [0, 2, 4, 6, 8]);
  assert.deepEqual(rangeArray(5, 0, -1), [5, 4, 3, 2, 1]);
  assert.deepEqual(rangeArray(3, 3), []);
});

test("sortBy", () => {
  const a = [
    { n: 2, id: "first" },
    { n: 1, id: "mid" },
    { n: 2, id: "second" }
  ];
  assert.deepEqual(sortBy(a, (x) => x.n), [
    { n: 1, id: "mid" },
    { n: 2, id: "first" },
    { n: 2, id: "second" }
  ]);
  assert.deepEqual(sortBy(["bb", "a", "ccc"], (s) => s.length), ["a", "bb", "ccc"]);
  assert.deepEqual(a, [
    { n: 2, id: "first" },
    { n: 1, id: "mid" },
    { n: 2, id: "second" }
  ]);
});
