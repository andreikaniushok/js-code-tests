import test from "node:test";
import assert from "node:assert/strict";
import { gcd, lcm, isPowerOfTwo, roundToStep, formatBytes } from "./solution.js";

test("gcd", () => {
  assert.equal(gcd(54, 24), 6);
  assert.equal(gcd(10, 0), 10);
  assert.equal(gcd(0, 10), 10);
  assert.equal(gcd(-54, 24), 6);
  assert.equal(gcd(54, -24), 6);
});

test("lcm", () => {
  assert.equal(lcm(6, 8), 24);
  assert.equal(lcm(21, 6), 42);
  assert.equal(lcm(0, 10), 0);
  assert.equal(lcm(-6, 8), 24);
});

test("isPowerOfTwo", () => {
  assert.equal(isPowerOfTwo(0), false);
  assert.equal(isPowerOfTwo(1), true);
  assert.equal(isPowerOfTwo(2), true);
  assert.equal(isPowerOfTwo(3), false);
  assert.equal(isPowerOfTwo(16), true);
  assert.equal(isPowerOfTwo(18), false);
});

test("roundToStep", () => {
  assert.equal(roundToStep(1.02, 0.05), 1.0);
  assert.equal(roundToStep(1.03, 0.05), 1.05);
  assert.equal(roundToStep(-1.02, 0.1), -1.0);
});

test("formatBytes", () => {
  assert.equal(formatBytes(0), "0 B");
  assert.equal(formatBytes(1024), "1 KB");
  assert.equal(formatBytes(1536), "1.5 KB");
  assert.equal(formatBytes(1048576), "1 MB");
  assert.equal(formatBytes(10), "10 B");
});

