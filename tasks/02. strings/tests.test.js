import test from "node:test";
import assert from "node:assert/strict";
import {
  capitalizeWords,
  isPalindromeNormalized,
  camelToKebab,
  kebabToCamel,
  escapeHtml,
  collapseWhitespace,
  padLeft,
  padRight,
  repeatText,
  startsWithIgnoreCase,
  endsWithIgnoreCase,
  countVowels,
  reverseString,
  stripNonAlnum,
  isAnagramNormalized,
  snakeToKebab,
  kebabToSnake,
  toSnakeCase,
  truncateMiddle,
  commonPrefix,
  commonSuffix,
  wrapLines,
  unescapeHtml,
  stripAnsi,
  byteLengthUtf8,
  longestWord,
  charCount
} from "./solution.js";

test("capitalizeWords", () => {
  assert.equal(capitalizeWords("hello world"), "Hello World");
  assert.equal(capitalizeWords("  multiple   spaces "), "Multiple Spaces");
  assert.equal(capitalizeWords("hELLo wORLd"), "HELLo WORLd");
});

test("isPalindromeNormalized", () => {
  assert.equal(isPalindromeNormalized("A man, a plan, a canal: Panama"), true);
  assert.equal(isPalindromeNormalized("race a car"), false);
  assert.equal(isPalindromeNormalized("1a2 2a1"), true);
  assert.equal(isPalindromeNormalized("!!!"), true);
});

test("camelToKebab", () => {
  assert.equal(camelToKebab("helloWorld"), "hello-world");
  assert.equal(camelToKebab("URLValue"), "url-value");
  assert.equal(camelToKebab("simple"), "simple");
});

test("kebabToCamel", () => {
  assert.equal(kebabToCamel("hello-world"), "helloWorld");
  assert.equal(kebabToCamel("user-id"), "userId");
  assert.equal(kebabToCamel("a"), "a");
});

test("escapeHtml", () => {
  assert.equal(escapeHtml(`Tom & Jerry`), "Tom &amp; Jerry");
  assert.equal(escapeHtml(`<div class="x">`), "&lt;div class=&quot;x&quot;&gt;");
  assert.equal(escapeHtml(`'\"&<>`), "&#39;&quot;&amp;&lt;&gt;");
});

test("collapseWhitespace", () => {
  assert.equal(collapseWhitespace("hello"), "hello");
  assert.equal(collapseWhitespace("  a   b\tc  "), "a b c");
  assert.equal(collapseWhitespace("\n\nfoo\t\tbar\n"), "foo bar");
  assert.equal(collapseWhitespace("   "), "");
});

test("padLeft", () => {
  assert.equal(padLeft("7", 3, "0"), "007");
  assert.equal(padLeft("hi", 5), "   hi");
  assert.equal(padLeft("hello", 3), "hello");
  assert.equal(padLeft("", 2, "*"), "**");
});

test("padRight", () => {
  assert.equal(padRight("7", 3, "0"), "700");
  assert.equal(padRight("hi", 5), "hi   ");
  assert.equal(padRight("hello", 3), "hello");
  assert.equal(padRight("", 2, "*"), "**");
});

test("repeatText", () => {
  assert.equal(repeatText("ab", 3), "ababab");
  assert.equal(repeatText("x", 1), "x");
  assert.equal(repeatText("hi", 0), "");
  assert.equal(repeatText("hi", -2), "");
});

test("startsWithIgnoreCase", () => {
  assert.equal(startsWithIgnoreCase("HelloWorld", "hello"), true);
  assert.equal(startsWithIgnoreCase("ABC", "ab"), true);
  assert.equal(startsWithIgnoreCase("abc", "abcd"), false);
  assert.equal(startsWithIgnoreCase("test", ""), true);
});

test("endsWithIgnoreCase", () => {
  assert.equal(endsWithIgnoreCase("HelloWorld", "WORLD"), true);
  assert.equal(endsWithIgnoreCase("ABC", "bc"), true);
  assert.equal(endsWithIgnoreCase("abc", "zabc"), false);
  assert.equal(endsWithIgnoreCase("test", ""), true);
});

test("countVowels", () => {
  assert.equal(countVowels("hello"), 2);
  assert.equal(countVowels("AEIOU"), 5);
  assert.equal(countVowels("rhythm"), 0);
  assert.equal(countVowels("coding"), 2);
});

test("reverseString", () => {
  assert.equal(reverseString("hello"), "olleh");
  assert.equal(reverseString(""), "");
  assert.equal(reverseString("a"), "a");
  assert.equal(reverseString("ab cd"), "dc ba");
});

test("stripNonAlnum", () => {
  assert.equal(stripNonAlnum("Hello, World!"), "helloworld");
  assert.equal(stripNonAlnum("A1_b2"), "a1b2");
  assert.equal(stripNonAlnum("!!!"), "");
  assert.equal(stripNonAlnum("Café"), "caf");
});

test("isAnagramNormalized", () => {
  assert.equal(isAnagramNormalized("Listen", "Silent"), true);
  assert.equal(isAnagramNormalized("Dormitory", "dirty room"), true);
  assert.equal(isAnagramNormalized("hello", "world"), false);
  assert.equal(isAnagramNormalized("!!!", "???"), true);
});

test("snakeToKebab", () => {
  assert.equal(snakeToKebab("hello_world"), "hello-world");
  assert.equal(snakeToKebab("a__b___c"), "a-b-c");
  assert.equal(snakeToKebab("simple"), "simple");
  assert.equal(snakeToKebab("_leading_"), "-leading-");
});

test("kebabToSnake", () => {
  assert.equal(kebabToSnake("hello-world"), "hello_world");
  assert.equal(kebabToSnake("a--b---c"), "a_b_c");
  assert.equal(kebabToSnake("simple"), "simple");
  assert.equal(kebabToSnake("-leading-"), "_leading_");
});

test("toSnakeCase", () => {
  assert.equal(toSnakeCase("helloWorld"), "hello_world");
  assert.equal(toSnakeCase("hello-world"), "hello_world");
  assert.equal(toSnakeCase("hello world"), "hello_world");
  assert.equal(toSnakeCase("URLValue"), "url_value");
});

test("truncateMiddle", () => {
  assert.equal(truncateMiddle("hello", 5), "hello");
  assert.equal(truncateMiddle("hello", 10), "hello");
  // maxLen includes the single-char ellipsis "…"; keep ends balanced
  assert.equal(truncateMiddle("abcdefghij", 5), "ab…ij");
  assert.equal(truncateMiddle("abcdef", 3), "a…f");
});

test("commonPrefix", () => {
  assert.equal(commonPrefix("hello", "help"), "hel");
  assert.equal(commonPrefix("abc", "abc"), "abc");
  assert.equal(commonPrefix("abc", "xyz"), "");
  assert.equal(commonPrefix("", "abc"), "");
});

test("commonSuffix", () => {
  assert.equal(commonSuffix("hello", "yello"), "ello");
  assert.equal(commonSuffix("abc", "abc"), "abc");
  assert.equal(commonSuffix("abc", "xyz"), "");
  assert.equal(commonSuffix("ending", "ing"), "ing");
});

test("wrapLines", () => {
  assert.equal(wrapLines("hello world", 5), "hello\nworld");
  assert.equal(wrapLines("a bb ccc", 3), "a\nbb\nccc");
  assert.equal(wrapLines("abcdefgh", 3), "abc\ndef\ngh");
  assert.equal(wrapLines("hi", 10), "hi");
});

test("unescapeHtml", () => {
  assert.equal(unescapeHtml("Tom &amp; Jerry"), "Tom & Jerry");
  assert.equal(unescapeHtml("&lt;div class=&quot;x&quot;&gt;"), `<div class="x">`);
  assert.equal(unescapeHtml("&#39;&quot;&amp;&lt;&gt;"), `'\"&<>`);
  assert.equal(unescapeHtml("plain"), "plain");
});

test("stripAnsi", () => {
  assert.equal(stripAnsi("\u001b[31mred\u001b[0m"), "red");
  assert.equal(stripAnsi("plain"), "plain");
  assert.equal(stripAnsi("\x1b[1;32mbold green\x1b[0m!"), "bold green!");
  assert.equal(stripAnsi("\u001b[38;5;196mhi\u001b[0m"), "hi");
});

test("byteLengthUtf8", () => {
  assert.equal(byteLengthUtf8("hello"), 5);
  assert.equal(byteLengthUtf8(""), 0);
  assert.equal(byteLengthUtf8("é"), 2);
  assert.equal(byteLengthUtf8("🙂"), 4);
});

test("longestWord", () => {
  assert.equal(longestWord("The quick brown fox jumped over the lazy dog"), "jumped");
  assert.equal(longestWord("I love programming"), "programming");
  assert.equal(longestWord("  a   bb  cc   "), "bb");
  assert.equal(longestWord(""), "");
});

test("charCount", () => {
  assert.deepEqual(charCount("hello"), { h: 1, e: 1, l: 2, o: 1 });
  assert.deepEqual(charCount("programming"), { p: 1, r: 2, o: 1, g: 2, a: 1, m: 2, i: 1, n: 1 });
  assert.deepEqual(charCount(""), {});
});
