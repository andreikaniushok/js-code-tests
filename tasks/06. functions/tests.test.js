import test from "node:test";
import assert from "node:assert/strict";
import {
  once,
  pipe,
  curry2,
  tap,
  memoizeWithKey,
  compose,
  identity,
  noop,
  times,
  partial,
  partialRight,
  negate,
  constant,
  tryCatch,
  defer,
  delay,
  onceAsync,
  memoize,
  withRetries,
  measure,
  wrap,
  flip2,
  unary,
  binary,
  nAry
} from "./solution.js";

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

test("compose", () => {
  const f = compose(
    (x) => `v=${x}`,
    (x) => x * 2,
    (x) => x + 1
  );
  assert.equal(f(3), "v=8");
  assert.equal(compose((x) => x + 1)(4), 5);
  assert.equal(compose()(9), 9);
});

test("identity", () => {
  assert.equal(identity(5), 5);
  assert.equal(identity(null), null);
  const o = { a: 1 };
  assert.equal(identity(o), o);
});

test("noop", () => {
  assert.equal(noop(), undefined);
  assert.equal(noop(1, 2, 3), undefined);
});

test("times", () => {
  assert.deepEqual(
    times(3, (i) => i * 2),
    [0, 2, 4]
  );
  assert.deepEqual(times(0, () => 1), []);
  assert.deepEqual(
    times(2, (i) => `n${i}`),
    ["n0", "n1"]
  );
});

test("partial", () => {
  const add3 = (a, b, c) => a + b + c;
  assert.equal(partial(add3, 1, 2)(3), 6);
  assert.equal(partial(add3, 1)(2, 3), 6);
  assert.deepEqual(partial((a, b) => [a, b], "x")("y"), ["x", "y"]);
});

test("partialRight", () => {
  const join = (a, b, c) => [a, b, c];
  assert.deepEqual(partialRight(join, 3)(1, 2), [1, 2, 3]);
  assert.deepEqual(partialRight(join, 2, 3)(1), [1, 2, 3]);
  assert.equal(partialRight((a, b) => a - b, 5)(10), 5);
});

test("negate", () => {
  const isPos = (x) => x > 0;
  assert.equal(negate(isPos)(-1), true);
  assert.equal(negate(isPos)(1), false);
  assert.equal(negate((x) => x === 0)(0), false);
});

test("constant", () => {
  const f = constant(42);
  assert.equal(f(), 42);
  assert.equal(f(1, 2), 42);
  assert.equal(constant(null)(), null);
});

test("tryCatch", () => {
  assert.equal(
    tryCatch(
      () => 1,
      () => 0
    )(),
    1
  );
  assert.equal(
    tryCatch(
      () => {
        throw new Error("boom");
      },
      (e) => e.message
    )(),
    "boom"
  );
  assert.equal(
    tryCatch(
      (x) => x * 2,
      () => -1
    )(5),
    10
  );
});

test("defer", async () => {
  let ran = false;
  const p = defer(() => {
    ran = true;
    return 5;
  });
  assert.equal(ran, false);
  assert.ok(p instanceof Promise);
  assert.equal(await p, 5);
  assert.equal(ran, true);
});

test("delay", async () => {
  const start = Date.now();
  const v = await delay(20, "hi");
  assert.equal(v, "hi");
  assert.ok(Date.now() - start >= 15);
  assert.equal(await delay(0, 7), 7);
});

test("onceAsync", async () => {
  let calls = 0;
  const f = onceAsync(async () => {
    calls += 1;
    return 42;
  });
  const [a, b] = await Promise.all([f(), f()]);
  assert.equal(a, 42);
  assert.equal(b, 42);
  assert.equal(calls, 1);
  assert.equal(await f(), 42);
  assert.equal(calls, 1);
});

test("memoize", () => {
  let calls = 0;
  const f = memoize((a, b) => {
    calls += 1;
    return a + b;
  });
  assert.equal(f(1, 2), 3);
  assert.equal(f(1, 2), 3);
  assert.equal(f(2, 1), 3);
  assert.equal(calls, 2);
});

test("withRetries", () => {
  let n = 0;
  assert.equal(
    withRetries(() => {
      n += 1;
      if (n < 3) throw new Error("retry");
      return n;
    }, 5),
    3
  );
  assert.throws(() => {
    withRetries(() => {
      throw new Error("fail");
    }, 2);
  }, /fail/);
  assert.equal(withRetries(() => 10, 1), 10);
});

test("measure", () => {
  const r = measure(() => 42);
  assert.equal(r.result, 42);
  assert.equal(typeof r.ms, "number");
  assert.ok(r.ms >= 0);
});

test("wrap", () => {
  const doubled = (x) => x * 2;
  const f = wrap(doubled, (fn, x) => fn(x) + 1);
  assert.equal(f(3), 7);
  assert.equal(
    wrap(
      (a, b) => a + b,
      (fn, a, b) => fn(a, b) * 10
    )(2, 3),
    50
  );
});

test("flip2", () => {
  assert.equal(flip2((a, b) => a - b)(5, 10), 5);
  assert.deepEqual(flip2((a, b) => [a, b])("y", "x"), ["x", "y"]);
  assert.equal(flip2((a, b) => a + b)("b", "a"), "ab");
});

test("unary", () => {
  assert.equal(unary((...args) => args.length)(1, 2, 3), 1);
  assert.deepEqual(
    ["10", "10", "10"].map(unary(parseInt)),
    [10, 10, 10]
  );
  assert.equal(unary((x) => x * 2)(4, 9), 8);
});

test("binary", () => {
  assert.equal(binary((...args) => args.length)(1, 2, 3), 2);
  assert.equal(binary((a, b, c) => c)(1, 2, 3), undefined);
  assert.equal(binary((a, b) => a + b)(2, 3, 99), 5);
});

test("nAry", () => {
  assert.equal(nAry((...args) => args.length, 3)(1, 2, 3, 4, 5), 3);
  assert.deepEqual(nAry((...args) => args, 0)(1, 2), []);
  assert.equal(nAry((a, b, c) => a + b + (c || 0), 2)(1, 2, 3), 3);
});
