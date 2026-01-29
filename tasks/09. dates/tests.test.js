import test from "node:test";
import assert from "node:assert/strict";
import { formatDateUTC, parseDateUTC, addDaysUTC, daysBetweenUTC, isSameUtcDay } from "./solution.js";

test("formatDateUTC / parseDateUTC", () => {
  const d = new Date(Date.UTC(2020, 0, 2, 10, 20, 30));
  assert.equal(formatDateUTC(d), "2020-01-02");
  const parsed = parseDateUTC("2020-01-02");
  assert.ok(parsed instanceof Date);
  assert.equal(parsed.toISOString(), "2020-01-02T00:00:00.000Z");
});

test("addDaysUTC", () => {
  const d = new Date(Date.UTC(2020, 0, 31));
  const d2 = addDaysUTC(d, 1);
  assert.equal(d2.toISOString(), "2020-02-01T00:00:00.000Z");
  assert.equal(d.toISOString(), "2020-01-31T00:00:00.000Z");
});

test("daysBetweenUTC", () => {
  const a = new Date(Date.UTC(2020, 0, 1));
  const b = new Date(Date.UTC(2020, 0, 10));
  assert.equal(daysBetweenUTC(a, b), 9);
  assert.equal(daysBetweenUTC(b, a), 9);
});

test("isSameUtcDay", () => {
  const a = new Date(Date.UTC(2020, 0, 1, 0, 0, 0));
  const b = new Date(Date.UTC(2020, 0, 1, 23, 59, 59));
  const c = new Date(Date.UTC(2020, 0, 2, 0, 0, 0));
  assert.equal(isSameUtcDay(a, b), true);
  assert.equal(isSameUtcDay(a, c), false);
});

