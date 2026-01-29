import test from "node:test";
import assert from "node:assert/strict";
import { extractMentions, isValidIPv4, maskCardNumber, splitCommandLine, parseDurationSeconds } from "./solution.js";

test("extractMentions", () => {
  assert.deepEqual(extractMentions("hi @john and @mary, ping @john"), ["john", "mary"]);
  assert.deepEqual(extractMentions("@a__ @b2 @a__"), ["a__", "b2"]);
  assert.deepEqual(extractMentions("no mentions"), []);
});

test("isValidIPv4", () => {
  assert.equal(isValidIPv4("0.0.0.0"), true);
  assert.equal(isValidIPv4("255.255.255.255"), true);
  assert.equal(isValidIPv4("256.0.0.1"), false);
  assert.equal(isValidIPv4("1.2.3"), false);
  assert.equal(isValidIPv4("01.2.3.4"), false);
});

test("maskCardNumber", () => {
  assert.equal(maskCardNumber("1234 5678 9012 3456"), "**** **** **** 3456");
  assert.equal(maskCardNumber("1234-5678-9012-3456"), "****-****-****-3456");
  assert.equal(maskCardNumber("3456"), "3456");
});

test("splitCommandLine", () => {
  assert.deepEqual(splitCommandLine(`git commit -m \"hello world\"`), ["git", "commit", "-m", "hello world"]);
  assert.deepEqual(splitCommandLine(`  a   b  c `), ["a", "b", "c"]);
  assert.deepEqual(splitCommandLine(`\"a b\" c`), ["a b", "c"]);
});

test("parseDurationSeconds", () => {
  assert.equal(parseDurationSeconds("1h 20m 5s"), 4805);
  assert.equal(parseDurationSeconds("20m"), 1200);
  assert.equal(parseDurationSeconds("5s 1h"), 3605);
  assert.equal(parseDurationSeconds(""), 0);
});

