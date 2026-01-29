import test from "node:test";
import assert from "node:assert/strict";
import {
  binarySearch,
  lowerBound,
  mergeSorted,
  uniqSorted,
  twoSumSorted,
  twoSum,
  maxSubsequenceSum,
  traverseTreeDfsValues,
  bubbleSort,
  insertionSort,
  selectionSort,
  quickSort
} from "./solution.js";

test("binarySearch", () => {
  assert.equal(binarySearch([1, 3, 5, 7], 5), 2);
  assert.equal(binarySearch([1, 3, 5, 7], 2), -1);
});

test("lowerBound", () => {
  assert.equal(lowerBound([1, 3, 5, 7], 0), 0);
  assert.equal(lowerBound([1, 3, 5, 7], 4), 2);
  assert.equal(lowerBound([1, 3, 5, 7], 7), 3);
  assert.equal(lowerBound([1, 3, 5, 7], 9), 4);
});

test("mergeSorted", () => {
  assert.deepEqual(mergeSorted([1, 3, 5], [2, 4, 6]), [1, 2, 3, 4, 5, 6]);
  assert.deepEqual(mergeSorted([], [1]), [1]);
});

test("uniqSorted", () => {
  assert.deepEqual(uniqSorted([1, 1, 2, 2, 3]), [1, 2, 3]);
  assert.deepEqual(uniqSorted([]), []);
});

test("twoSumSorted", () => {
  assert.deepEqual(twoSumSorted([1, 2, 4, 7, 11], 9), [1, 3]); // 2+7
  assert.equal(twoSumSorted([1, 2, 4], 100), null);
});

test("twoSum (unsorted)", () => {
  assert.deepEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);
  assert.deepEqual(twoSum([3, 2, 4], 6), [1, 2]);
  assert.deepEqual(twoSum([3, 3], 6), [0, 1]);
  assert.equal(twoSum([1, 2, 3], 100), null);
});

test("maxSubsequenceSum (non-contiguous)", () => {
  assert.equal(maxSubsequenceSum([3, -1, 4, -2, 5]), 12);
  assert.equal(maxSubsequenceSum([-5, -1, -10]), 0);
  assert.equal(maxSubsequenceSum([]), 0);
  assert.equal(maxSubsequenceSum([1, 2, 3]), 6);
});

test("traverseTreeDfsValues", () => {
  const tree = {
    value: "Root",
    children: [
      {
        value: "Node1",
        children: [
          { value: "Node3", children: [{ value: "Node7", children: [] }] },
          { value: "Node4", children: [] }
        ]
      },
      {
        value: "Node2",
        children: [
          { value: "Node5", children: [{ value: "Node8", children: [] }] },
          { value: "Node6", children: [] }
        ]
      }
    ]
  };

  assert.deepEqual(traverseTreeDfsValues(tree), ["Root", "Node1", "Node3", "Node7", "Node4", "Node2", "Node5", "Node8", "Node6"]);
  assert.deepEqual(traverseTreeDfsValues({ value: 1, children: [] }), [1]);
  assert.deepEqual(traverseTreeDfsValues({ value: 1 }), [1]);
});

function assertSortDoesNotMutate(sortFn, input, expected) {
  const original = [...input];
  const out = sortFn(input);
  assert.deepEqual(out, expected);
  assert.deepEqual(input, original);
}

test("bubbleSort / insertionSort / selectionSort / quickSort", () => {
  const a = [3, 2, 1, 4, 6, 5, 11, 10];
  const expected = [1, 2, 3, 4, 5, 6, 10, 11];

  assertSortDoesNotMutate(bubbleSort, a, expected);
  assertSortDoesNotMutate(insertionSort, a, expected);
  assertSortDoesNotMutate(selectionSort, a, expected);
  assertSortDoesNotMutate(quickSort, a, expected);

  const b = [0, -1, 5, 5, 2];
  const expectedB = [-1, 0, 2, 5, 5];
  assertSortDoesNotMutate(bubbleSort, b, expectedB);
});

