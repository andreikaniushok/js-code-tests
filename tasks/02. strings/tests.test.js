import test from "node:test";
import assert from "node:assert/strict";
import {
  capitalizeWords,
  isPalindromeNormalized,
  camelToKebab,
  kebabToCamel,
  escapeHtml,
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

