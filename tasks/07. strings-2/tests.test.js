import test from "node:test";
import assert from "node:assert/strict";
import {
  slugify,
  truncateEllipsis,
  countOccurrences,
  reverseWords,
  stripHtmlTags,
  stripPunctuation,
  normalizeNewlines,
  splitLines,
  indentLines,
  dedent,
  surround,
  ensurePrefix,
  ensureSuffix,
  stripPrefix,
  stripSuffix,
  between,
  linesCount,
  words,
  capitalizeFirst,
  swapCase,
  replaceAll,
  stripRepeated,
  safeSlice,
  toAsciiLower,
  toAsciiUpper,
  longestCommonPrefix,
} from "./solution.js";

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

test("stripPunctuation", () => {
  assert.equal(stripPunctuation("hello"), "hello");
  assert.equal(stripPunctuation("Hello, world!"), "Hello world");
  assert.equal(stripPunctuation("a-b_c.d"), "abcd");
});

test("normalizeNewlines", () => {
  assert.equal(normalizeNewlines("hello"), "hello");
  assert.equal(normalizeNewlines("a\r\nb\rc"), "a\nb\nc");
  assert.equal(normalizeNewlines("x\ny"), "x\ny");
});

test("splitLines", () => {
  assert.deepEqual(splitLines("hello"), ["hello"]);
  assert.deepEqual(splitLines("a\r\nb\rc"), ["a", "b", "c"]);
  assert.deepEqual(splitLines(""), [""]);
});

test("indentLines", () => {
  assert.equal(indentLines("a\nb", "  "), "  a\n  b");
  assert.equal(indentLines("hello", "> "), "> hello");
  assert.equal(indentLines("", "--"), "--");
});

test("dedent", () => {
  assert.equal(dedent("hello"), "hello");
  assert.equal(dedent("  a\n  b\n  c"), "a\nb\nc");
  assert.equal(dedent("    x\n  y\n    z"), "  x\ny\n  z");
});

test("surround", () => {
  assert.equal(surround("x", "(", ")"), "(x)");
  assert.equal(surround("hi", "*"), "*hi*");
  assert.equal(surround("", "[", "]"), "[]");
});

test("ensurePrefix", () => {
  assert.equal(ensurePrefix("world", "hello "), "hello world");
  assert.equal(ensurePrefix("hello world", "hello "), "hello world");
  assert.equal(ensurePrefix("", "pre"), "pre");
});

test("ensureSuffix", () => {
  assert.equal(ensureSuffix("file", ".js"), "file.js");
  assert.equal(ensureSuffix("file.js", ".js"), "file.js");
  assert.equal(ensureSuffix("", ".txt"), ".txt");
});

test("stripPrefix", () => {
  assert.equal(stripPrefix("hello world", "hello "), "world");
  assert.equal(stripPrefix("world", "hello "), "world");
  assert.equal(stripPrefix("abc", "abc"), "");
});

test("stripSuffix", () => {
  assert.equal(stripSuffix("file.js", ".js"), "file");
  assert.equal(stripSuffix("file", ".js"), "file");
  assert.equal(stripSuffix("abc", "abc"), "");
});

test("between", () => {
  assert.equal(between("[hello]", "[", "]"), "hello");
  assert.equal(between("a<b>c", "<", ">"), "b");
  assert.equal(between("nope", "(", ")"), "");
});

test("linesCount", () => {
  assert.equal(linesCount(""), 1);
  assert.equal(linesCount("hello"), 1);
  assert.equal(linesCount("a\nb\nc"), 3);
});

test("words", () => {
  assert.deepEqual(words("hello world"), ["hello", "world"]);
  assert.deepEqual(words("  a   b  c "), ["a", "b", "c"]);
  assert.deepEqual(words(""), []);
});

test("capitalizeFirst", () => {
  assert.equal(capitalizeFirst("hello"), "Hello");
  assert.equal(capitalizeFirst("hELLO"), "HELLO");
  assert.equal(capitalizeFirst(""), "");
});

test("swapCase", () => {
  assert.equal(swapCase("Hello"), "hELLO");
  assert.equal(swapCase("aBc"), "AbC");
  assert.equal(swapCase("123!"), "123!");
});

test("replaceAll", () => {
  assert.equal(replaceAll("aaa", "a", "b"), "bbb");
  assert.equal(replaceAll("foo.bar.baz", ".", "-"), "foo-bar-baz");
  assert.equal(replaceAll("hello", "x", "y"), "hello");
});

test("stripRepeated", () => {
  assert.equal(stripRepeated("---", "-"), "-");
  assert.equal(stripRepeated("aabbcc", "b"), "aabcc");
  assert.equal(stripRepeated("hello", "l"), "helo");
});

test("safeSlice", () => {
  assert.equal(safeSlice("hello", 1, 4), "ell");
  assert.equal(safeSlice("hello", -10, 2), "he");
  assert.equal(safeSlice("hello", 3, 100), "lo");
});

test("toAsciiLower", () => {
  assert.equal(toAsciiLower("Hello"), "hello");
  assert.equal(toAsciiLower("ABC-xyz"), "abc-xyz");
  assert.equal(toAsciiLower("ÄÖ"), "ÄÖ");
});

test("toAsciiUpper", () => {
  assert.equal(toAsciiUpper("Hello"), "HELLO");
  assert.equal(toAsciiUpper("abc-XYZ"), "ABC-XYZ");
  assert.equal(toAsciiUpper("äö"), "äö");
});

test("longestCommonPrefix", () => {
  assert.equal(longestCommonPrefix(["flower", "flow", "flight"]), "fl");
  assert.equal(longestCommonPrefix(["dog", "racecar", "car"]), "none");
  assert.equal(longestCommonPrefix([]), "none");
  assert.equal(longestCommonPrefix(["same", "same"]), "same");
});
