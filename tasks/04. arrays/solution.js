/**
 * Task: Flatten an array by depth levels (depth=0 → copy).
 * Note: Do not mutate input; for depth=0 return a new array (see tests).
 * Input: arr — any[]; depth — number (integer >= 0).
 * Output: any[].
 *
 * @param {any[]} arr
 * @param {number} depth
 * @returns {any[]}
 */
export function flattenDepth(arr, depth) {
  // TODO: implement. Example: [1, [2, [3]]], 2 => [1, 2, 3]
  void depth;
  return Array.isArray(arr) ? [...arr] : [];
}

/**
 * Task: Cyclic right rotation by k (k can be negative/bigger than length). Do not mutate input.
 * Input: arr — T[]; k — number (integer).
 * Output: T[].
 *
 * @template T
 * @param {T[]} arr
 * @param {number} k
 * @returns {T[]}
 */
export function rotate(arr, k) {
  // TODO: implement. Example: [1, 2, 3], -1 => [2, 3, 1]
  void k;
  return Array.isArray(arr) ? [...arr] : [];
}

/**
 * Task: Return pairs [a[i], b[i]] up to the min length.
 * Input: a — any[]; b — any[].
 * Output: any[][] (array of pairs).
 *
 * @param {any[]} a
 * @param {any[]} b
 * @returns {any[][]}
 */
export function zip(a, b) {
  // TODO: implement. Example: [], [1] => []
  void b;
  return Array.isArray(a) ? a.slice(0, 0) : [];
}

/**
 * Task: Return an array of sliding windows of length n (contiguous chunks). If n > length → [].
 * Note: Do not mutate input.
 * Input: arr — any[]; n — number (integer > 0).
 * Output: any[][].
 *
 * @param {any[]} arr
 * @param {number} n
 * @returns {any[][]}
 */
export function slidingWindow(arr, n) {
  // TODO: implement. Example: [1, 2], 3 => []
  void arr;
  void n;
  return [];
}

/**
 * Task: Unique by keySelector(item); keep the first occurrence of each key.
 * Input: arr — any[]; keySelector — (item:any)=>string.
 * Output: any[].
 *
 * @param {any[]} arr
 * @param {(item:any)=>string} keySelector
 * @returns {any[]}
 */
export function uniqueBy(arr, keySelector) {
  // TODO: implement. Example: [{ id: "a", v: 1 }, { id: "b", v: 2 }, { id: "a", v: 3 }], (x) => x.id => [{ id: "a", v: 1 }, { id: "b", v: 2 }]
  void keySelector;
  return Array.isArray(arr) ? [...arr] : [];
}

/**
 * Task: Split array into chunks of size (last may be shorter). Do not mutate input.
 * Input: arr — T[]; size — number (integer > 0).
 * Output: T[][].
 *
 * @template T
 * @param {T[]} arr
 * @param {number} size
 * @returns {T[][]}
 */
export function chunk(arr, size) {
  // TODO: implement. Example: [1, "a"], 3 => [1, 2]
  void size;
  return Array.isArray(arr) ? [arr.slice(0, 0)] : [];
}

/**
 * Task: Remove all falsy elements (false,0,"",null,undefined,NaN). Do not mutate input.
 * Input: arr — T[].
 * Output: T[].
 *
 * @template T
 * @param {T[]} arr
 * @returns {T[]}
 */
export function compact(arr) {
  // TODO: implement. Example: [1, "a"] => [1, 2]
  return Array.isArray(arr) ? [...arr] : [];
}

/**
 * Task: Return the first n elements. Do not mutate input.
 * Input: arr — T[]; n — number (integer >= 0).
 * Output: T[].
 *
 * @template T
 * @param {T[]} arr
 * @param {number} n
 * @returns {T[]}
 */
export function take(arr, n) {
  // TODO: implement. Example: [1, "a"], 3 => [1, 2]
  void n;
  return Array.isArray(arr) ? [...arr] : [];
}

/**
 * Task: Return the array without the first n elements. Do not mutate input.
 * Input: arr — T[]; n — number (integer >= 0).
 * Output: T[].
 *
 * @template T
 * @param {T[]} arr
 * @param {number} n
 * @returns {T[]}
 */
export function drop(arr, n) {
  // TODO: implement. Example: [1, "a"], 3 => [1, 2]
  void n;
  return Array.isArray(arr) ? [...arr] : [];
}

/**
 * Task: First element or undefined.
 * Input: arr — T[].
 * Output: T | undefined.
 *
 * @template T
 * @param {T[]} arr
 * @returns {T|undefined}
 */
export function first(arr) {
  // TODO: implement. Example: [1, "a"] => undefined
  void arr;
  return undefined;
}

/**
 * Task: Last element or undefined.
 * Input: arr — T[].
 * Output: T | undefined.
 *
 * @template T
 * @param {T[]} arr
 * @returns {T|undefined}
 */
export function last(arr) {
  // TODO: implement. Example: [1, "a"] => undefined
  void arr;
  return undefined;
}

/**
 * Task: Sum of numbers (empty → 0). Do not mutate input.
 * Input: arr — number[].
 * Output: number.
 *
 * @param {number[]} arr
 * @returns {number}
 */
export function sum(arr) {
  // TODO: implement. Example: 3 => 6
  void arr;
  return 0;
}

/**
 * Task: Split into [passed, failed] by predicate(item, index). Do not mutate input.
 * Input: arr — T[]; predicate — (item:T,index:number)=>boolean.
 * Output: [T[], T[]].
 *
 * @template T
 * @param {T[]} arr
 * @param {(item:T, index:number)=>boolean} predicate
 * @returns {[T[], T[]]}
 */
export function partition(arr, predicate) {
  // TODO: implement. Example: [1, "a"], 3 => [1, 2]
  void arr;
  void predicate;
  return [[], []];
}

/**
 * Task: Group into an object { [key]: items[] } by keySelector(item). Do not mutate input.
 * Input: arr — T[]; keySelector — (item:T)=>string.
 * Output: Record<string, T[]>.
 *
 * @template T
 * @param {T[]} arr
 * @param {(item:T)=>string} keySelector
 * @returns {Record<string, T[]>}
 */
export function groupBy(arr, keySelector) {
  // TODO: implement. Example: [1, "a"], "hello" => "hello"
  void arr;
  void keySelector;
  return {};
}

/**
 * Task: Count into an object { [key]: count } by keySelector(item). Do not mutate input.
 * Input: arr — T[]; keySelector — (item:T)=>string.
 * Output: Record<string, number>.
 *
 * @template T
 * @param {T[]} arr
 * @param {(item:T)=>string} keySelector
 * @returns {Record<string, number>}
 */
export function countBy(arr, keySelector) {
  // TODO: implement. Example: [1, "a"], "hello" => 2
  void arr;
  void keySelector;
  return {};
}

/**
 * Task: Elements in a that are not in b (===). Do not mutate input.
 * Input: a — T[]; b — T[].
 * Output: T[].
 *
 * @template T
 * @param {T[]} a
 * @param {T[]} b
 * @returns {T[]}
 */
export function difference(a, b) {
  // TODO: implement. Example: [1, "a"], [1, "a"] => [1, 2]
  void a;
  void b;
  return [];
}

/**
 * Task: Common elements without repeats (===), order as in a. Do not mutate input.
 * Input: a — T[]; b — T[].
 * Output: T[].
 *
 * @template T
 * @param {T[]} a
 * @param {T[]} b
 * @returns {T[]}
 */
export function intersection(a, b) {
  // TODO: implement. Example: [1, "a"], [1, "a"] => [1, 2]
  void a;
  void b;
  return [];
}

/**
 * Task: Union without repeats (===): first elements of a, then new ones from b. Do not mutate input.
 * Input: a — T[]; b — T[].
 * Output: T[].
 *
 * @template T
 * @param {T[]} a
 * @param {T[]} b
 * @returns {T[]}
 */
export function union(a, b) {
  // TODO: implement. Example: [1, "a"], [1, "a"] => [1, 2]
  void a;
  void b;
  return [];
}

/**
 * Task: Unique values by === in first-appearance order. Do not mutate input.
 * Input: arr — T[].
 * Output: T[].
 *
 * @template T
 * @param {T[]} arr
 * @returns {T[]}
 */
export function unique(arr) {
  // TODO: implement. Example: [1, "a"] => [1, 2]
  return Array.isArray(arr) ? [...arr] : [];
}

/**
 * Task: Transpose a rectangular matrix. Do not mutate input.
 * Input: matrix — any[][].
 * Output: any[][].
 *
 * @param {any[][]} matrix
 * @returns {any[][]}
 */
export function transpose(matrix) {
  // TODO: implement. Example: [1, 2, 3] => [1, 2]
  void matrix;
  return [];
}

/**
 * Task: Fully deep-flatten an array of any nesting. Do not mutate input.
 * Input: arr — any[].
 * Output: any[].
 *
 * @param {any[]} arr
 * @returns {any[]}
 */
export function deepFlat(arr) {
  // TODO: implement. Example: [1, 2, 3] => [1, 2]
  void arr;
  return [];
}

/**
 * Task: Insert value at index and return a new array. Do not mutate input.
 * Input: arr — T[]; index — number; value — T.
 * Output: T[].
 *
 * @template T
 * @param {T[]} arr
 * @param {number} index
 * @param {T} value
 * @returns {T[]}
 */
export function insertAt(arr, index, value) {
  // TODO: implement. Example: [1, "a"], 3, null => [1, 2]
  void arr;
  void index;
  void value;
  return [];
}

/**
 * Task: Remove element at index and return a new array. Do not mutate input.
 * Input: arr — T[]; index — number.
 * Output: T[].
 *
 * @template T
 * @param {T[]} arr
 * @param {number} index
 * @returns {T[]}
 */
export function removeAt(arr, index) {
  // TODO: implement. Example: [1, "a"], 3 => [1, 2]
  void arr;
  void index;
  return [];
}

/**
 * Task: Range: start..end (end is exclusive), step may be negative.
 * Input: start — number; end — number; step — number.
 * Output: number[].
 *
 * @param {number} start
 * @param {number} end
 * @param {number} [step]
 * @returns {number[]}
 */
export function rangeArray(start, end, step = 1) {
  // TODO: implement. Example: 3, 3 => 1
  void start;
  void end;
  void step;
  return [];
}

/**
 * Task: Stable sort by keySelector(item). Return a new array; do not mutate input.
 * Input: arr — T[]; keySelector — (item:T)=>any.
 * Output: T[].
 *
 * @template T
 * @param {T[]} arr
 * @param {(item:T)=>any} keySelector
 * @returns {T[]}
 */
export function sortBy(arr, keySelector) {
  // TODO: implement. Example: [1, "a"], [1, 2, 3] => [1, 2]
  void arr;
  void keySelector;
  return [];
}

