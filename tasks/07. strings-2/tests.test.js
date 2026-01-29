import test from "node:test";
import assert from "node:assert/strict";
import { slugify, truncateEllipsis, countOccurrences, reverseWords, stripHtmlTags, longestCommonPrefix } from "./solution.js";

test("slugify", () => {
  assert.equal(slugify("Hello, World!"), "hello-world");
  assert.equal(slugify("  A  B   C "), "a-b-c");
  assert.equal(slugify("Already-slug"), "already-slug");
});

test("truncateEllipsis", () => {
  assert.equal(truncateEllipsis("hello", 5), "hello");
  assert.equal(truncateEllipsis("hello world", 5), "hell…");
  assert.equal(truncateEllipsis("", 1), "");
});

test("countOccurrences", () => {
  assert.equal(countOccurrences("aaaa", "aa"), 2);
  assert.equal(countOccurrences("aaaa", "aaa"), 1);
  assert.equal(countOccurrences("abc", "d"), 0);
});

test("reverseWords", () => {
  assert.equal(reverseWords("hello world"), "world hello");
  assert.equal(reverseWords("  a   b  c "), "c b a");
});

test("stripHtmlTags", () => {
  assert.equal(stripHtmlTags("<b>Hello</b>"), "Hello");
  assert.equal(stripHtmlTags("a<br/>b"), "ab");
  assert.equal(stripHtmlTags("no tags"), "no tags");
});

test("longestCommonPrefix", () => {
  assert.equal(longestCommonPrefix(["flower", "flow", "flight"]), "fl");
  assert.equal(longestCommonPrefix(["dog", "racecar", "car"]), "none");
  assert.equal(longestCommonPrefix([]), "none");
  assert.equal(longestCommonPrefix(["same", "same"]), "same");
});

