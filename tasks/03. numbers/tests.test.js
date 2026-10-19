import test from "node:test";
import assert from "node:assert/strict";
import {
  gcd,
  lcm,
  isPowerOfTwo,
  roundToStep,
  formatBytes,
  clampNumber,
  signum,
  mod,
  isEven,
  isOdd,
  sumNumbers,
  mean,
  median,
  lerp,
  inverseLerp,
  mapRange,
  approxEqual,
  roundToDecimals,
  toRadians,
  toDegrees,
  isWithin,
  clamp01,
  parseNumberStrict,
  countDecimals,
  normalizeAngleRad
} from "./solution.js";

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

test("clampNumber", () => {
  assert.equal(clampNumber(5, 0, 10), 5);
  assert.equal(clampNumber(-1, 0, 10), 0);
  assert.equal(clampNumber(99, 0, 10), 10);
  assert.equal(clampNumber(3, 3, 3), 3);
});

test("signum", () => {
  assert.equal(signum(5), 1);
  assert.equal(signum(-3.2), -1);
  assert.equal(signum(0), 0);
  assert.equal(signum(-0), 0);
});

test("mod", () => {
  assert.equal(mod(7, 3), 1);
  assert.equal(mod(-1, 5), 4);
  assert.equal(mod(10, 5), 0);
  assert.equal(mod(-7, 3), 2);
});

test("isEven", () => {
  assert.equal(isEven(2), true);
  assert.equal(isEven(0), true);
  assert.equal(isEven(-4), true);
  assert.equal(isEven(3), false);
  assert.equal(isEven(2.5), false);
});

test("isOdd", () => {
  assert.equal(isOdd(3), true);
  assert.equal(isOdd(-5), true);
  assert.equal(isOdd(2), false);
  assert.equal(isOdd(2.5), false);
  assert.equal(isOdd(0), false);
});

test("sumNumbers", () => {
  assert.equal(sumNumbers([1, 2, 3]), 6);
  assert.equal(sumNumbers([]), 0);
  assert.equal(sumNumbers([-2, 5]), 3);
  assert.equal(sumNumbers([0]), 0);
});

test("mean", () => {
  assert.equal(mean([1, 2, 3]), 2);
  assert.equal(mean([10]), 10);
  assert.ok(Number.isNaN(mean([])));
  assert.equal(mean([-2, 2]), 0);
});

test("median", () => {
  const arr = [3, 1, 2];
  assert.equal(median(arr), 2);
  assert.deepEqual(arr, [3, 1, 2]);
  assert.equal(median([1, 2, 3, 4]), 2.5);
  assert.equal(median([7]), 7);
});

test("lerp", () => {
  assert.equal(lerp(0, 10, 0.5), 5);
  assert.equal(lerp(2, 4, 0), 2);
  assert.equal(lerp(2, 4, 1), 4);
  assert.equal(lerp(0, 1, 0.25), 0.25);
});

test("inverseLerp", () => {
  assert.equal(inverseLerp(0, 10, 5), 0.5);
  assert.equal(inverseLerp(2, 4, 2), 0);
  assert.equal(inverseLerp(2, 4, 4), 1);
  assert.equal(inverseLerp(0, 1, 0.25), 0.25);
});

test("mapRange", () => {
  assert.equal(mapRange(5, 0, 10, 0, 100), 50);
  assert.equal(mapRange(0, 0, 1, 10, 20), 10);
  assert.equal(mapRange(1, 0, 1, 10, 20), 20);
  assert.equal(mapRange(2, 0, 4, -1, 1), 0);
});

test("approxEqual", () => {
  assert.equal(approxEqual(1, 1), true);
  assert.equal(approxEqual(1, 1 + 1e-10), true);
  assert.equal(approxEqual(1, 1.01, 0.001), false);
  assert.equal(approxEqual(1, 1.01, 0.02), true);
});

test("roundToDecimals", () => {
  assert.equal(roundToDecimals(1.2345, 2), 1.23);
  assert.equal(roundToDecimals(1.235, 2), 1.24);
  assert.equal(roundToDecimals(5, 0), 5);
  assert.equal(roundToDecimals(-1.236, 2), -1.24);
});

test("toRadians", () => {
  assert.equal(toRadians(0), 0);
  assert.equal(toRadians(180), Math.PI);
  assert.equal(toRadians(90), Math.PI / 2);
  assert.equal(toRadians(-180), -Math.PI);
});

test("toDegrees", () => {
  assert.equal(toDegrees(0), 0);
  assert.equal(toDegrees(Math.PI), 180);
  assert.equal(toDegrees(Math.PI / 2), 90);
  assert.equal(toDegrees(-Math.PI), -180);
});

test("isWithin", () => {
  assert.equal(isWithin(5, 5, 0), true);
  assert.equal(isWithin(5.1, 5, 0.2), true);
  assert.equal(isWithin(5.3, 5, 0.2), false);
  assert.equal(isWithin(-1, 0, 1), true);
});

test("clamp01", () => {
  assert.equal(clamp01(0.5), 0.5);
  assert.equal(clamp01(-1), 0);
  assert.equal(clamp01(2), 1);
  assert.equal(clamp01(0), 0);
});

test("parseNumberStrict", () => {
  assert.equal(parseNumberStrict("3.14"), 3.14);
  assert.equal(parseNumberStrict("-2"), -2);
  assert.equal(parseNumberStrict("10"), 10);
  assert.equal(parseNumberStrict(" 1"), null);
  assert.equal(parseNumberStrict("1px"), null);
  assert.equal(parseNumberStrict(""), null);
});

test("countDecimals", () => {
  // JS number 1.230 === 1.23; count digits in standard decimal string form
  assert.equal(countDecimals(1.234), 3);
  assert.equal(countDecimals(1.23), 2);
  assert.equal(countDecimals(5), 0);
  assert.equal(countDecimals(1.5), 1);
});

test("normalizeAngleRad", () => {
  assert.equal(normalizeAngleRad(0), 0);
  assert.equal(normalizeAngleRad(Math.PI), Math.PI);
  assert.equal(normalizeAngleRad(-Math.PI), Math.PI);
  assert.equal(normalizeAngleRad(3 * Math.PI), Math.PI);
  assert.ok(Math.abs(normalizeAngleRad(-3 * Math.PI / 2) - Math.PI / 2) < 1e-12);
});
