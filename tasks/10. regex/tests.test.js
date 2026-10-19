import test from "node:test";
import assert from "node:assert/strict";
import {
  extractMentions,
  isValidIPv4,
  maskCardNumber,
  splitCommandLine,
  parseDurationSeconds,
  extractHashtags,
  isValidHexColor,
  isValidEmailSimple,
  extractUrls,
  normalizeSpaces,
  removeExtraBlankLines,
  isValidUuidV4,
  extractNumbers,
  isValidDateISO,
  stripCommentsJsLine,
  matchAllGroups,
  escapeRegExp,
  splitCsvLineSimple,
  isStrongPassword,
  extractKeyValuePairs,
  maskEmails,
  extractCodeBlocksMd,
  isValidTime,
  parseSignedInt,
  tokenizeSimple
} from "./solution.js";

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

test("extractHashtags", () => {
  assert.deepEqual(extractHashtags("hi #js and #node, again #js"), ["js", "node"]);
  assert.deepEqual(extractHashtags("#a_1 #b2 #a_1"), ["a_1", "b2"]);
  assert.deepEqual(extractHashtags("no tags"), []);
});

test("isValidHexColor", () => {
  assert.equal(isValidHexColor("#abc"), true);
  assert.equal(isValidHexColor("#a1b2c3"), true);
  assert.equal(isValidHexColor("#gg0000"), false);
  assert.equal(isValidHexColor("abc"), false);
});

test("isValidEmailSimple", () => {
  assert.equal(isValidEmailSimple("user@example.com"), true);
  assert.equal(isValidEmailSimple("a.b+c@mail.co"), true);
  assert.equal(isValidEmailSimple("not-an-email"), false);
  assert.equal(isValidEmailSimple("@nodomain.com"), false);
});

test("extractUrls", () => {
  assert.deepEqual(extractUrls("see https://a.com and http://b.org/x"), ["https://a.com", "http://b.org/x"]);
  assert.deepEqual(extractUrls("no urls here"), []);
  assert.deepEqual(extractUrls("ftp://nope.com https://ok.io"), ["https://ok.io"]);
});

test("normalizeSpaces", () => {
  assert.equal(normalizeSpaces("  a \t  b   c  "), "a b c");
  assert.equal(normalizeSpaces("hello"), "hello");
  assert.equal(normalizeSpaces("   "), "");
});

test("removeExtraBlankLines", () => {
  assert.equal(removeExtraBlankLines("a\n\n\nb\n\nc"), "a\n\nb\n\nc");
  assert.equal(removeExtraBlankLines("x\n\n\n\n\ny"), "x\n\ny");
  assert.equal(removeExtraBlankLines("single"), "single");
});

test("isValidUuidV4", () => {
  assert.equal(isValidUuidV4("550e8400-e29b-41d4-a716-446655440000"), true);
  assert.equal(isValidUuidV4("550e8400-e29b-31d4-a716-446655440000"), false);
  assert.equal(isValidUuidV4("not-a-uuid"), false);
});

test("extractNumbers", () => {
  assert.deepEqual(extractNumbers("a -12 and 3.5 plus -.5"), ["-12", "3.5", "-.5"]);
  assert.deepEqual(extractNumbers("no nums"), []);
  assert.deepEqual(extractNumbers("42"), ["42"]);
});

test("isValidDateISO", () => {
  assert.equal(isValidDateISO("2020-01-02"), true);
  assert.equal(isValidDateISO("2020-02-29"), true);
  assert.equal(isValidDateISO("2019-02-29"), false);
  assert.equal(isValidDateISO("2020-1-2"), false);
});

test("stripCommentsJsLine", () => {
  assert.equal(stripCommentsJsLine("const x = 1; // hi"), "const x = 1; ");
  assert.equal(stripCommentsJsLine("// only"), "");
  assert.equal(stripCommentsJsLine("a // b\nc // d"), "a \nc ");
});

test("matchAllGroups", () => {
  assert.deepEqual(
    matchAllGroups("a1 b2", /(?<letter>[a-z])(?<digit>\d)/g),
    [{ letter: "a", digit: "1" }, { letter: "b", digit: "2" }]
  );
  assert.deepEqual(matchAllGroups("xx", /(?<n>\d)/g), []);
  assert.deepEqual(
    matchAllGroups("ab", /(?<x>[a-z])/g),
    [{ x: "a" }, { x: "b" }]
  );
});

test("escapeRegExp", () => {
  assert.equal(escapeRegExp("a+b*c?"), "a\\+b\\*c\\?");
  assert.equal(escapeRegExp("hello"), "hello");
  assert.ok(new RegExp(`^${escapeRegExp("(x)")}$`).exec("(x)"));
});

test("splitCsvLineSimple", () => {
  assert.deepEqual(splitCsvLineSimple(`a,"b,c",d`), ["a", "b,c", "d"]);
  assert.deepEqual(splitCsvLineSimple("x,y,z"), ["x", "y", "z"]);
  assert.deepEqual(splitCsvLineSimple(`"hello"`), ["hello"]);
});

test("isStrongPassword", () => {
  assert.equal(isStrongPassword("Abcd123!"), true);
  assert.equal(isStrongPassword("short1!"), false);
  assert.equal(isStrongPassword("alllowercase1!"), false);
  assert.equal(isStrongPassword("NoSpecial1"), false);
});

test("extractKeyValuePairs", () => {
  assert.deepEqual(extractKeyValuePairs("a=1 b=2"), { a: "1", b: "2" });
  assert.deepEqual(extractKeyValuePairs("foo=bar"), { foo: "bar" });
  assert.deepEqual(extractKeyValuePairs("1a=x valid_key=ok"), { valid_key: "ok" });
});

test("maskEmails", () => {
  assert.equal(maskEmails("mail user@ex.com please"), "mail ***@ex.com please");
  assert.equal(maskEmails("a@b.co and c@d.io"), "***@b.co and ***@d.io");
  assert.equal(maskEmails("no email"), "no email");
});

test("extractCodeBlocksMd", () => {
  assert.deepEqual(extractCodeBlocksMd("pre ```js\ncode\n``` post"), ["js\ncode\n"]);
  assert.deepEqual(extractCodeBlocksMd("```\na\n```\n```\nb\n```"), ["\na\n", "\nb\n"]);
  assert.deepEqual(extractCodeBlocksMd("no blocks"), []);
});

test("isValidTime", () => {
  assert.equal(isValidTime("00:00"), true);
  assert.equal(isValidTime("23:59"), true);
  assert.equal(isValidTime("24:00"), false);
  assert.equal(isValidTime("9:05"), false);
});

test("parseSignedInt", () => {
  assert.equal(parseSignedInt("age=-42 years"), -42);
  assert.equal(parseSignedInt("no number"), null);
  assert.equal(parseSignedInt("x 7 y"), 7);
});

test("tokenizeSimple", () => {
  assert.deepEqual(tokenizeSimple("hi, world!"), ["hi", ",", "world", "!"]);
  assert.deepEqual(tokenizeSimple("a+b=3"), ["a", "+", "b", "=", "3"]);
  assert.deepEqual(tokenizeSimple("  "), []);
});
