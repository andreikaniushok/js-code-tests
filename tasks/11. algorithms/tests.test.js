import test from "node:test";
import assert from "node:assert/strict";
import {
  binarySearch,
  lowerBound,
  mergeSorted,
  uniqSorted,
  twoSumSorted,
  upperBound,
  countEqualSorted,
  countInRangeSorted,
  insertSorted,
  removeOneSorted,
  mergeKSorted,
  isSorted,
  minMaxSorted,
  dedupeSortedInPlace,
  kthSmallestSorted,
  binarySearchFirst,
  binarySearchLast,
  rotateSortedSearch,
  twoSumCountSorted,
  threeSumSorted,
  mergeIntervals,
  minSubarrayLenAtLeast,
  prefixSums,
  lowerBoundBy,
  binarySearchBy,
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

test("upperBound", () => {
  assert.equal(upperBound([1, 3, 3, 5], 3), 3);
  assert.equal(upperBound([1, 3, 5, 7], 0), 0);
  assert.equal(upperBound([1, 3, 5, 7], 7), 4);
  assert.equal(upperBound([1, 3, 5, 7], 4), 2);
});

test("countEqualSorted", () => {
  assert.equal(countEqualSorted([1, 2, 2, 2, 3], 2), 3);
  assert.equal(countEqualSorted([1, 2, 3], 4), 0);
  assert.equal(countEqualSorted([], 1), 0);
});

test("countInRangeSorted", () => {
  assert.equal(countInRangeSorted([1, 2, 3, 4, 5], 2, 4), 3);
  assert.equal(countInRangeSorted([1, 3, 5], 6, 10), 0);
  assert.equal(countInRangeSorted([2, 2, 2], 2, 2), 3);
});

test("insertSorted", () => {
  assert.deepEqual(insertSorted([1, 3, 5], 4), [1, 3, 4, 5]);
  assert.deepEqual(insertSorted([], 2), [2]);
  assert.deepEqual(insertSorted([1, 2], 0), [0, 1, 2]);
});

test("removeOneSorted", () => {
  assert.deepEqual(removeOneSorted([1, 2, 2, 3], 2), [1, 2, 3]);
  assert.deepEqual(removeOneSorted([1, 2, 3], 4), [1, 2, 3]);
  assert.deepEqual(removeOneSorted([5], 5), []);
});

test("mergeKSorted", () => {
  assert.deepEqual(mergeKSorted([[1, 4], [2, 3], [0, 5]]), [0, 1, 2, 3, 4, 5]);
  assert.deepEqual(mergeKSorted([[], [1], []]), [1]);
  assert.deepEqual(mergeKSorted([]), []);
});

test("isSorted", () => {
  assert.equal(isSorted([1, 2, 2, 3]), true);
  assert.equal(isSorted([3, 2, 1]), false);
  assert.equal(isSorted([]), true);
});

test("minMaxSorted", () => {
  assert.deepEqual(minMaxSorted([1, 2, 9]), { min: 1, max: 9 });
  assert.equal(minMaxSorted([]), null);
  assert.deepEqual(minMaxSorted([7]), { min: 7, max: 7 });
});

test("dedupeSortedInPlace", () => {
  const a = [1, 1, 2, 2, 3];
  assert.equal(dedupeSortedInPlace(a), 3);
  assert.deepEqual(a.slice(0, 3), [1, 2, 3]);
  const b = [];
  assert.equal(dedupeSortedInPlace(b), 0);
  const c = [5, 5, 5];
  assert.equal(dedupeSortedInPlace(c), 1);
  assert.equal(c[0], 5);
});

test("kthSmallestSorted", () => {
  assert.equal(kthSmallestSorted([1, 3, 5, 7], 0), 1);
  assert.equal(kthSmallestSorted([1, 3, 5, 7], 2), 5);
  assert.equal(kthSmallestSorted([1, 3], 5), undefined);
});

test("binarySearchFirst", () => {
  assert.equal(binarySearchFirst([1, 2, 2, 2, 3], 2), 1);
  assert.equal(binarySearchFirst([1, 2, 3], 4), -1);
  assert.equal(binarySearchFirst([2, 2, 2], 2), 0);
});

test("binarySearchLast", () => {
  assert.equal(binarySearchLast([1, 2, 2, 2, 3], 2), 3);
  assert.equal(binarySearchLast([1, 2, 3], 4), -1);
  assert.equal(binarySearchLast([2, 2, 2], 2), 2);
});

test("rotateSortedSearch", () => {
  assert.equal(rotateSortedSearch([4, 5, 6, 7, 0, 1, 2], 0), 4);
  assert.equal(rotateSortedSearch([4, 5, 6, 7, 0, 1, 2], 3), -1);
  assert.equal(rotateSortedSearch([1], 1), 0);
});

test("twoSumCountSorted", () => {
  assert.equal(twoSumCountSorted([1, 2, 3, 4], 5), 2); // 1+4, 2+3
  assert.equal(twoSumCountSorted([1, 1, 1, 1], 2), 6);
  assert.equal(twoSumCountSorted([1, 2], 100), 0);
});

test("threeSumSorted", () => {
  const a = [1, 2, 3, 4, 5];
  const idxs = threeSumSorted(a, 9);
  assert.ok(idxs !== null);
  assert.ok(idxs[0] < idxs[1] && idxs[1] < idxs[2]);
  assert.equal(a[idxs[0]] + a[idxs[1]] + a[idxs[2]], 9);
  assert.equal(threeSumSorted([1, 2, 3], 100), null);
  const b = [-2, 0, 1, 2];
  const idxs2 = threeSumSorted(b, 0);
  assert.ok(idxs2 !== null);
  assert.equal(b[idxs2[0]] + b[idxs2[1]] + b[idxs2[2]], 0);
});

test("mergeIntervals", () => {
  assert.deepEqual(mergeIntervals([[1, 3], [2, 6], [8, 10]]), [[1, 6], [8, 10]]);
  assert.deepEqual(mergeIntervals([[1, 4], [0, 2]]), [[0, 4]]);
  assert.deepEqual(mergeIntervals([]), []);
});

test("minSubarrayLenAtLeast", () => {
  assert.equal(minSubarrayLenAtLeast([2, 3, 1, 2, 4, 3], 7), 2);
  assert.equal(minSubarrayLenAtLeast([1, 1, 1], 5), 0);
  assert.equal(minSubarrayLenAtLeast([1, 4, 4], 4), 1);
});

test("prefixSums", () => {
  assert.deepEqual(prefixSums([1, 2, 3]), [0, 1, 3, 6]);
  assert.deepEqual(prefixSums([]), [0]);
  assert.deepEqual(prefixSums([5]), [0, 5]);
});

test("lowerBoundBy", () => {
  const arr = [{ k: 1 }, { k: 3 }, { k: 5 }];
  assert.equal(lowerBoundBy(arr, 4, (x) => x.k), 2);
  assert.equal(lowerBoundBy(arr, 0, (x) => x.k), 0);
  assert.equal(lowerBoundBy(arr, 9, (x) => x.k), 3);
});

test("binarySearchBy", () => {
  const arr = [{ k: 1 }, { k: 3 }, { k: 5 }];
  assert.equal(binarySearchBy(arr, 3, (x) => x.k), 1);
  assert.equal(binarySearchBy(arr, 4, (x) => x.k), -1);
  assert.equal(binarySearchBy(arr, 1, (x) => x.k), 0);
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
