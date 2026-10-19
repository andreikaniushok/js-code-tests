import test from "node:test";
import assert from "node:assert/strict";
import {
  getByPath,
  setByPath,
  pick,
  omit,
  deepFreeze,
  hasOwn,
  shallowEqual,
  mapValues,
  mapKeys,
  invertObject,
  mergeShallow,
  defaults,
  cloneShallow,
  unsetByPath,
  getOrSet,
  entriesSorted,
  fromEntries,
  omitBy,
  pickBy,
  deepClone,
  deepMerge,
  toPathArray,
  isPlainObject,
  safeGet,
  safeSet
} from "./solution.js";

test("getByPath", () => {
  assert.equal(getByPath({ a: { b: { c: 1 } } }, "a.b.c"), 1);
  assert.equal(getByPath({ a: { b: [{ c: 2 }] } }, "a.b[0].c"), 2);
  assert.equal(getByPath({ a: {} }, "a.b.c"), undefined);
});

test("setByPath", () => {
  const obj = {};
  const out = setByPath(obj, "a.b[0].c", 10);
  assert.equal(out, obj);
  assert.deepEqual(obj, { a: { b: [{ c: 10 }] } });
});

test("pick / omit", () => {
  const obj = { a: 1, b: 2, c: 3 };
  assert.deepEqual(pick(obj, ["a", "c"]), { a: 1, c: 3 });
  assert.deepEqual(omit(obj, ["b"]), { a: 1, c: 3 });
});

test("deepFreeze", () => {
  const obj = { a: { b: [1, 2] } };
  deepFreeze(obj);
  assert.ok(Object.isFrozen(obj));
  assert.ok(Object.isFrozen(obj.a));
  assert.ok(Object.isFrozen(obj.a.b));
});

test("hasOwn", () => {
  assert.equal(hasOwn({ a: 1 }, "a"), true);
  assert.equal(hasOwn({ a: 1 }, "b"), false);
  assert.equal(hasOwn(Object.create({ a: 1 }), "a"), false);
  assert.equal(hasOwn(null, "a"), false);
});

test("shallowEqual", () => {
  assert.equal(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2 }), true);
  assert.equal(shallowEqual({ a: 1 }, { a: 2 }), false);
  assert.equal(shallowEqual(null, null), true);
  assert.equal(shallowEqual({ a: { b: 1 } }, { a: { b: 1 } }), false);
});

test("mapValues", () => {
  assert.deepEqual(
    mapValues({ a: 1, b: 2 }, (v) => v * 2),
    { a: 2, b: 4 }
  );
  assert.deepEqual(
    mapValues({ x: 3 }, (v, k) => `${k}:${v}`),
    { x: "x:3" }
  );
  assert.deepEqual(mapValues({}, (v) => v), {});
});

test("mapKeys", () => {
  assert.deepEqual(
    mapKeys({ a: 1, b: 2 }, (k) => k.toUpperCase()),
    { A: 1, B: 2 }
  );
  assert.deepEqual(
    mapKeys({ a: 10 }, (k, v) => `${k}${v}`),
    { a10: 10 }
  );
  assert.deepEqual(mapKeys({}, (k) => k), {});
});

test("invertObject", () => {
  assert.deepEqual(invertObject({ a: 1, b: 2 }), { "1": "a", "2": "b" });
  assert.deepEqual(invertObject({ x: "hi" }), { hi: "x" });
  assert.deepEqual(invertObject({}), {});
});

test("mergeShallow", () => {
  assert.deepEqual(mergeShallow({ a: 1 }, { a: 2, b: 3 }), { a: 2, b: 3 });
  assert.deepEqual(mergeShallow({ a: 1 }, { b: 2 }, { c: 3 }), { a: 1, b: 2, c: 3 });
  assert.deepEqual(mergeShallow({}, { a: null }), { a: null });
});

test("defaults", () => {
  assert.deepEqual(defaults({ a: 1, b: undefined }, { a: 9, b: 2, c: 3 }), {
    a: 1,
    b: 2,
    c: 3
  });
  assert.deepEqual(defaults({ a: null }, { a: 1, b: 2 }), { a: null, b: 2 });
  assert.deepEqual(defaults({}, { x: 1 }), { x: 1 });
});

test("cloneShallow", () => {
  const obj = { a: 1, nested: { b: 2 } };
  const c = cloneShallow(obj);
  assert.deepEqual(c, obj);
  assert.notEqual(c, obj);
  assert.equal(c.nested, obj.nested);
  const arr = [1, { x: 1 }];
  const ca = cloneShallow(arr);
  assert.deepEqual(ca, arr);
  assert.notEqual(ca, arr);
  assert.equal(ca[1], arr[1]);
});

test("unsetByPath", () => {
  const obj = { a: { b: 1, c: 2 }, d: [{ e: 3 }, { e: 4 }] };
  const out = unsetByPath(obj, "a.b");
  assert.equal(out, obj);
  assert.deepEqual(obj.a, { c: 2 });
  unsetByPath(obj, "d[0].e");
  assert.deepEqual(obj.d[0], {});
  assert.equal(obj.d[1].e, 4);
});

test("getOrSet", () => {
  const obj = {};
  let calls = 0;
  assert.equal(
    getOrSet(obj, "x", () => {
      calls += 1;
      return 5;
    }),
    5
  );
  assert.equal(obj.x, 5);
  assert.equal(
    getOrSet(obj, "x", () => {
      calls += 1;
      return 99;
    }),
    5
  );
  assert.equal(calls, 1);
});

test("entriesSorted", () => {
  assert.deepEqual(entriesSorted({ b: 2, a: 1, c: 3 }), [
    ["a", 1],
    ["b", 2],
    ["c", 3]
  ]);
  assert.deepEqual(entriesSorted({}), []);
  assert.deepEqual(entriesSorted({ z: 0 }), [["z", 0]]);
});

test("fromEntries", () => {
  assert.deepEqual(
    fromEntries([
      ["a", 1],
      ["b", 2]
    ]),
    { a: 1, b: 2 }
  );
  assert.deepEqual(fromEntries([]), {});
  assert.deepEqual(
    fromEntries([
      ["x", null],
      ["y", "z"]
    ]),
    { x: null, y: "z" }
  );
});

test("omitBy", () => {
  assert.deepEqual(
    omitBy({ a: 1, b: 2, c: 3 }, (_k, v) => v > 1),
    { a: 1 }
  );
  assert.deepEqual(
    omitBy({ a: 1, b: 2 }, (k) => k === "a"),
    { b: 2 }
  );
  assert.deepEqual(omitBy({}, () => true), {});
});

test("pickBy", () => {
  assert.deepEqual(
    pickBy({ a: 1, b: 2, c: 3 }, (_k, v) => v > 1),
    { b: 2, c: 3 }
  );
  assert.deepEqual(
    pickBy({ a: 1, b: 2 }, (k) => k === "a"),
    { a: 1 }
  );
  assert.deepEqual(pickBy({ a: 0 }, (_k, v) => Boolean(v)), {});
});

test("deepClone", () => {
  const obj = { a: { b: [1, { c: 2 }] }, d: 3 };
  const c = deepClone(obj);
  assert.deepEqual(c, obj);
  assert.notEqual(c, obj);
  assert.notEqual(c.a, obj.a);
  assert.notEqual(c.a.b, obj.a.b);
  assert.notEqual(c.a.b[1], obj.a.b[1]);
  c.a.b[0] = 99;
  assert.equal(obj.a.b[0], 1);
});

test("deepMerge", () => {
  assert.deepEqual(deepMerge({ a: { b: 1 } }, { a: { c: 2 } }), { a: { b: 1, c: 2 } });
  assert.deepEqual(deepMerge({ a: 1, b: 2 }, { b: 3, c: 4 }), { a: 1, b: 3, c: 4 });
  assert.deepEqual(deepMerge([1, { x: 1 }], [2, { y: 2 }]), [2, { x: 1, y: 2 }]);
});

test("toPathArray", () => {
  assert.deepEqual(toPathArray("a.b[0].c"), ["a", "b", 0, "c"]);
  assert.deepEqual(toPathArray("x"), ["x"]);
  assert.deepEqual(toPathArray("items[2].name"), ["items", 2, "name"]);
});

test("isPlainObject", () => {
  assert.equal(isPlainObject({}), true);
  assert.equal(isPlainObject({ a: 1 }), true);
  assert.equal(isPlainObject([]), false);
  assert.equal(isPlainObject(new Date()), false);
  assert.equal(isPlainObject(null), false);
});

test("safeGet", () => {
  assert.equal(safeGet({ a: 1 }, "a", 0), 1);
  assert.equal(safeGet({ a: 1 }, "b", 0), 0);
  assert.equal(safeGet(null, "a", 7), 7);
  assert.equal(safeGet({ a: undefined }, "a", 7), undefined);
});

test("safeSet", () => {
  const obj = { a: 1 };
  assert.equal(safeSet(obj, "b", 2), obj);
  assert.deepEqual(obj, { a: 1, b: 2 });
  assert.equal(safeSet(null, "a", 1), null);
  assert.equal(safeSet(42, "a", 1), 42);
});
