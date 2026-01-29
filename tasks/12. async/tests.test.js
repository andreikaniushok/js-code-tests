import test from "node:test";
import assert from "node:assert/strict";
import { sleep, withTimeout, retryAsync, mapLimit, allSettledSummary } from "./solution.js";

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

