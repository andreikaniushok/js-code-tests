import test from "node:test";
import assert from "node:assert/strict";
import {
  sleep,
  withTimeout,
  retryAsync,
  mapLimit,
  allSettledSummary,
  delayValue,
  timeout,
  withAbort,
  raceFirstFulfilled,
  mapSeries,
  filterAsync,
  reduceAsync,
  retryBackoff,
  queue,
  pAllLimit,
  pAny,
  pFinally,
  toResult,
  allSettled,
  withRetryCondition,
  mapLimitOrdered,
  concurrentPool,
  sleepUntil,
  withMinDuration,
  debounceAsync
} from "./solution.js";

test("sleep", async () => {
  const start = Date.now();
  await sleep(20);
  assert.ok(Date.now() - start >= 10);
});

test("withTimeout", async () => {
  const ok = new Promise((r) => setTimeout(() => r("ok"), 10));
  assert.equal(await withTimeout(ok, 50), "ok");

  const slow = new Promise((r) => setTimeout(() => r("slow"), 50));
  await assert.rejects(async () => withTimeout(slow, 10), /Timeout/);
});

test("retryAsync", async () => {
  let n = 0;
  const fn = async () => {
    n += 1;
    if (n < 3) throw new Error("fail");
    return "ok";
  };
  assert.equal(await retryAsync(fn, 3, 0), "ok");
});

test("mapLimit: concurrency and order", async () => {
  let active = 0;
  let maxActive = 0;
  const res = await mapLimit([1, 2, 3, 4, 5], 2, async (x) => {
    active += 1;
    maxActive = Math.max(maxActive, active);
    await new Promise((r) => setTimeout(r, 10));
    active -= 1;
    return x * 2;
  });
  assert.deepEqual(res, [2, 4, 6, 8, 10]);
  assert.ok(maxActive <= 2);
});

test("allSettledSummary", async () => {
  const out = await allSettledSummary([
    async () => 1,
    async () => {
      throw new Error("x");
    },
    async () => 3
  ]);
  assert.deepEqual(out.fulfilled, [1, 3]);
  assert.equal(out.rejected.length, 1);
  assert.ok(out.rejected[0] instanceof Error);
});

test("delayValue", async () => {
  const start = Date.now();
  assert.equal(await delayValue(15, "hi"), "hi");
  assert.ok(Date.now() - start >= 10);
  assert.equal(await delayValue(0, 42), 42);
});

test("timeout", async () => {
  const start = Date.now();
  await assert.rejects(async () => timeout(15), /Timeout/);
  assert.ok(Date.now() - start >= 10);
});

test("withAbort", async () => {
  assert.equal(await withAbort(Promise.resolve(7), new AbortController().signal), 7);

  const ac = new AbortController();
  const slow = new Promise((r) => setTimeout(() => r("late"), 50));
  setTimeout(() => ac.abort(), 5);
  await assert.rejects(
    async () => withAbort(slow, ac.signal),
    (err) => err && (err.name === "AbortError" || err.code === "ABORT_ERR")
  );

  const ac2 = new AbortController();
  ac2.abort();
  await assert.rejects(
    async () => withAbort(Promise.resolve(1), ac2.signal),
    (err) => err && (err.name === "AbortError" || err.code === "ABORT_ERR")
  );
});

test("raceFirstFulfilled", async () => {
  const a = new Promise((_, rej) => setTimeout(() => rej(new Error("a")), 5));
  const b = new Promise((res) => setTimeout(() => res("b"), 10));
  assert.equal(await raceFirstFulfilled([a, b]), "b");

  await assert.rejects(
    async () =>
      raceFirstFulfilled([
        Promise.reject(new Error("x")),
        Promise.reject(new Error("y"))
      ])
  );
});

test("mapSeries", async () => {
  const order = [];
  const res = await mapSeries([1, 2, 3], async (x, i) => {
    order.push(i);
    await new Promise((r) => setTimeout(r, 5));
    return x * 10;
  });
  assert.deepEqual(res, [10, 20, 30]);
  assert.deepEqual(order, [0, 1, 2]);
});

test("filterAsync", async () => {
  const res = await filterAsync([1, 2, 3, 4], async (x) => {
    await new Promise((r) => setTimeout(r, 0));
    return x % 2 === 0;
  });
  assert.deepEqual(res, [2, 4]);
  assert.deepEqual(await filterAsync([], async () => true), []);
});

test("reduceAsync", async () => {
  const sum = await reduceAsync([1, 2, 3], async (acc, x) => acc + x, 0);
  assert.equal(sum, 6);
  const empty = await reduceAsync([], async (acc) => acc, 10);
  assert.equal(empty, 10);
});

test("retryBackoff", async () => {
  let n = 0;
  const start = Date.now();
  const fn = async () => {
    n += 1;
    if (n < 3) throw new Error("fail");
    return "ok";
  };
  assert.equal(await retryBackoff(fn, 3, 5), "ok");
  assert.ok(Date.now() - start >= 5);
  assert.equal(n, 3);
});

test("queue: concurrency bound", async () => {
  const q = queue(2);
  let active = 0;
  let maxActive = 0;
  const tasks = [1, 2, 3, 4].map((n) =>
    q.add(async () => {
      active += 1;
      maxActive = Math.max(maxActive, active);
      await new Promise((r) => setTimeout(r, 10));
      active -= 1;
      return n;
    })
  );
  const results = await Promise.all(tasks);
  await q.onIdle();
  assert.deepEqual(results, [1, 2, 3, 4]);
  assert.ok(maxActive <= 2);
});

test("pAllLimit: concurrency and order", async () => {
  let active = 0;
  let maxActive = 0;
  const fns = [1, 2, 3, 4].map((n) => async () => {
    active += 1;
    maxActive = Math.max(maxActive, active);
    await new Promise((r) => setTimeout(r, 10));
    active -= 1;
    return n * 2;
  });
  const res = await pAllLimit(fns, 2);
  assert.deepEqual(res, [2, 4, 6, 8]);
  assert.ok(maxActive <= 2);
});

test("pAny", async () => {
  const slow = new Promise((r) => setTimeout(() => r("slow"), 20));
  const fast = new Promise((r) => setTimeout(() => r("fast"), 5));
  assert.equal(await pAny([slow, fast]), "fast");

  await assert.rejects(
    async () => pAny([Promise.reject(new Error("a")), Promise.reject(new Error("b"))]),
    (err) => err instanceof AggregateError
  );
});

test("pFinally", async () => {
  let called = 0;
  assert.equal(await pFinally(Promise.resolve(1), () => { called += 1; }), 1);
  assert.equal(called, 1);

  let called2 = 0;
  await assert.rejects(
    async () =>
      pFinally(Promise.reject(new Error("x")), () => {
        called2 += 1;
      })
  );
  assert.equal(called2, 1);
});

test("toResult", async () => {
  assert.deepEqual(await toResult(Promise.resolve(5)), { ok: true, value: 5 });
  const bad = await toResult(Promise.reject(new Error("boom")));
  assert.equal(bad.ok, false);
  assert.ok(bad.error instanceof Error);
  assert.equal(bad.error.message, "boom");
});

test("allSettled", async () => {
  const out = await allSettled([Promise.resolve(1), Promise.reject(new Error("e")), Promise.resolve(3)]);
  assert.equal(out.length, 3);
  assert.deepEqual(out[0], { status: "fulfilled", value: 1 });
  assert.equal(out[1].status, "rejected");
  assert.equal(out[1].reason.message, "e");
  assert.deepEqual(out[2], { status: "fulfilled", value: 3 });
});

test("withRetryCondition", async () => {
  let n = 0;
  const fn = async () => {
    n += 1;
    throw new Error(n < 3 ? "retry" : "stop");
  };
  await assert.rejects(
    async () => withRetryCondition(fn, 5, (err) => err.message === "retry"),
    /stop/
  );
  assert.equal(n, 3);

  let m = 0;
  assert.equal(
    await withRetryCondition(async () => {
      m += 1;
      if (m < 2) throw new Error("retry");
      return "ok";
    }, 3, () => true),
    "ok"
  );
});

test("mapLimitOrdered", async () => {
  let active = 0;
  let maxActive = 0;
  const res = await mapLimitOrdered([1, 2, 3, 4], 2, async (x) => {
    active += 1;
    maxActive = Math.max(maxActive, active);
    await new Promise((r) => setTimeout(r, x === 1 ? 15 : 5));
    active -= 1;
    return x * 10;
  });
  assert.deepEqual(res, [10, 20, 30, 40]);
  assert.ok(maxActive <= 2);
});

test("concurrentPool", async () => {
  let active = 0;
  let maxActive = 0;
  const tasks = [1, 2, 3, 4].map((n) => async () => {
    active += 1;
    maxActive = Math.max(maxActive, active);
    await new Promise((r) => setTimeout(r, 10));
    active -= 1;
    return n;
  });
  const res = await concurrentPool(2, tasks);
  assert.deepEqual(res, [1, 2, 3, 4]);
  assert.ok(maxActive <= 2);
});

test("sleepUntil", async () => {
  await sleepUntil(new Date(0));
  const start = Date.now();
  await sleepUntil(new Date(Date.now() + 15));
  assert.ok(Date.now() - start >= 10);
});

test("withMinDuration", async () => {
  const start = Date.now();
  assert.equal(await withMinDuration(Promise.resolve("x"), 15), "x");
  assert.ok(Date.now() - start >= 10);

  await assert.rejects(
    async () => withMinDuration(Promise.reject(new Error("e")), 10),
    /e/
  );
});

test("debounceAsync", async () => {
  let calls = 0;
  const fn = debounceAsync(async (x) => {
    calls += 1;
    return x;
  }, 15);

  fn(1);
  fn(2);
  assert.equal(await fn(3), 3);
  assert.equal(calls, 1);
});
