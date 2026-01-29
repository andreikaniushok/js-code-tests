import test from "node:test";
import assert from "node:assert/strict";
import { getByPath, setByPath, pick, omit, deepFreeze } from "./solution.js";

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

