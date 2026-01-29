import test from "node:test";
import assert from "node:assert/strict";
import { once, pipe, curry2, tap, memoizeWithKey } from "./solution.js";

test("once", () => {
  let calls = 0;
  const f = once((x) => {
    calls += 1;
    return x * 2;
  });
  assert.equal(f(2), 4);
  assert.equal(f(10), 4);
  assert.equal(calls, 1);
});

test("pipe", () => {
  const f = pipe(
    (x) => x + 1,
    (x) => x * 2,
    (x) => `v=${x}`
  );
  assert.equal(f(3), "v=8");
});

test("curry2", () => {
  const add = (a, b) => a + b;
  assert.equal(curry2(add)(2)(3), 5);
});

test("tap", () => {
  const seen = [];
  const t = tap((x) => seen.push(x));
  assert.equal(t(10), 10);
  assert.deepEqual(seen, [10]);
});

test("memoizeWithKey", () => {
  let calls = 0;
  const f = memoizeWithKey(
    (a, b) => {
      calls += 1;
      return a + b;
    },
    (a, b) => `${a}:${b}`
  );
  assert.equal(f(1, 2), 3);
  assert.equal(f(1, 2), 3);
  assert.equal(f(2, 1), 3);
  assert.equal(calls, 2);
});

