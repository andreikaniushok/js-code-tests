import test from "node:test";
import assert from "node:assert/strict";
import {
  formatDateUTC,
  parseDateUTC,
  addDaysUTC,
  daysBetweenUTC,
  isSameUtcDay,
  startOfUtcDay,
  endOfUtcDay,
  addHoursUTC,
  addMinutesUTC,
  addMonthsUTC,
  addYearsUTC,
  isBeforeUTC,
  isAfterUTC,
  clampDateUTC,
  formatTimeUTC,
  parseTimeUTC,
  formatDateTimeUTC,
  getWeekdayUTC,
  isWeekendUTC,
  daysInMonthUTC,
  isValidDate,
  toUnixSeconds,
  fromUnixSeconds,
  parseIsoDateTimeUTC,
  isSameUtcMonth,
} from "./solution.js";

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

test("startOfUtcDay", () => {
  const d = new Date(Date.UTC(2020, 5, 15, 14, 30, 45, 123));
  const out = startOfUtcDay(d);
  assert.equal(out.toISOString(), "2020-06-15T00:00:00.000Z");
  assert.equal(d.toISOString(), "2020-06-15T14:30:45.123Z");
});

test("endOfUtcDay", () => {
  const d = new Date(Date.UTC(2020, 5, 15, 14, 30, 45));
  const out = endOfUtcDay(d);
  assert.equal(out.toISOString(), "2020-06-15T23:59:59.999Z");
  assert.notEqual(out.getTime(), d.getTime());
});

test("addHoursUTC", () => {
  const d = new Date(Date.UTC(2020, 0, 1, 22, 0, 0));
  const out = addHoursUTC(d, 3);
  assert.equal(out.toISOString(), "2020-01-02T01:00:00.000Z");
  assert.equal(d.toISOString(), "2020-01-01T22:00:00.000Z");
});

test("addMinutesUTC", () => {
  const d = new Date(Date.UTC(2020, 0, 1, 0, 50, 0));
  const out = addMinutesUTC(d, 20);
  assert.equal(out.toISOString(), "2020-01-01T01:10:00.000Z");
  assert.equal(addMinutesUTC(d, -10).toISOString(), "2020-01-01T00:40:00.000Z");
});

test("addMonthsUTC", () => {
  const d = new Date(Date.UTC(2020, 0, 31, 12, 0, 0));
  const out = addMonthsUTC(d, 1);
  assert.equal(out.toISOString(), "2020-02-29T12:00:00.000Z");
  assert.equal(addMonthsUTC(new Date(Date.UTC(2020, 0, 15)), 1).toISOString(), "2020-02-15T00:00:00.000Z");
  assert.equal(d.toISOString(), "2020-01-31T12:00:00.000Z");
});

test("addYearsUTC", () => {
  const d = new Date(Date.UTC(2020, 1, 29, 8, 0, 0));
  const out = addYearsUTC(d, 1);
  assert.equal(out.toISOString(), "2021-02-28T08:00:00.000Z");
  assert.equal(addYearsUTC(new Date(Date.UTC(2019, 5, 1)), 2).toISOString(), "2021-06-01T00:00:00.000Z");
});

test("isBeforeUTC / isAfterUTC", () => {
  const a = new Date(Date.UTC(2020, 0, 1));
  const b = new Date(Date.UTC(2020, 0, 2));
  assert.equal(isBeforeUTC(a, b), true);
  assert.equal(isBeforeUTC(b, a), false);
  assert.equal(isAfterUTC(b, a), true);
  assert.equal(isAfterUTC(a, a), false);
});

test("clampDateUTC", () => {
  const min = new Date(Date.UTC(2020, 0, 5));
  const max = new Date(Date.UTC(2020, 0, 10));
  assert.equal(clampDateUTC(new Date(Date.UTC(2020, 0, 1)), min, max).toISOString(), min.toISOString());
  assert.equal(clampDateUTC(new Date(Date.UTC(2020, 0, 7)), min, max).toISOString(), "2020-01-07T00:00:00.000Z");
  assert.equal(clampDateUTC(new Date(Date.UTC(2020, 0, 20)), min, max).toISOString(), max.toISOString());
});

test("formatTimeUTC", () => {
  assert.equal(formatTimeUTC(new Date(Date.UTC(2020, 0, 1, 3, 4, 5))), "03:04:05");
  assert.equal(formatTimeUTC(new Date(Date.UTC(2020, 0, 1, 23, 59, 1))), "23:59:01");
  assert.equal(formatTimeUTC(new Date(Date.UTC(1970, 0, 1, 0, 0, 0))), "00:00:00");
});

test("parseTimeUTC", () => {
  assert.deepEqual(parseTimeUTC("03:04:05"), { h: 3, m: 4, s: 5 });
  assert.deepEqual(parseTimeUTC("23:59:59"), { h: 23, m: 59, s: 59 });
  assert.equal(parseTimeUTC("24:00:00"), null);
  assert.equal(parseTimeUTC("3:04:05"), null);
});

test("formatDateTimeUTC", () => {
  assert.equal(
    formatDateTimeUTC(new Date(Date.UTC(2020, 0, 2, 10, 20, 30, 456))),
    "2020-01-02T10:20:30Z"
  );
  assert.equal(
    formatDateTimeUTC(new Date(Date.UTC(1970, 0, 1, 0, 0, 0))),
    "1970-01-01T00:00:00Z"
  );
});

test("getWeekdayUTC", () => {
  assert.equal(getWeekdayUTC(new Date(Date.UTC(1970, 0, 1))), 4);
  assert.equal(getWeekdayUTC(new Date(Date.UTC(2020, 0, 5))), 0);
  assert.equal(getWeekdayUTC(new Date(Date.UTC(2020, 0, 4))), 6);
});

test("isWeekendUTC", () => {
  assert.equal(isWeekendUTC(new Date(Date.UTC(2020, 0, 4))), true);
  assert.equal(isWeekendUTC(new Date(Date.UTC(2020, 0, 5))), true);
  assert.equal(isWeekendUTC(new Date(Date.UTC(2020, 0, 6))), false);
});

test("daysInMonthUTC", () => {
  assert.equal(daysInMonthUTC(2020, 1), 29);
  assert.equal(daysInMonthUTC(2019, 1), 28);
  assert.equal(daysInMonthUTC(2021, 0), 31);
});

test("isValidDate", () => {
  assert.equal(isValidDate(new Date(Date.UTC(2020, 0, 1))), true);
  assert.equal(isValidDate(new Date(Number.NaN)), false);
  assert.equal(isValidDate("2020-01-01"), false);
});

test("toUnixSeconds / fromUnixSeconds", () => {
  const d = new Date(Date.UTC(2020, 0, 1, 0, 0, 0));
  assert.equal(toUnixSeconds(d), 1577836800);
  assert.equal(fromUnixSeconds(0).toISOString(), "1970-01-01T00:00:00.000Z");
  assert.equal(fromUnixSeconds(1577836800).toISOString(), d.toISOString());
});

test("parseIsoDateTimeUTC", () => {
  const d = parseIsoDateTimeUTC("2020-01-02T10:20:30Z");
  assert.ok(d instanceof Date);
  assert.equal(d.toISOString(), "2020-01-02T10:20:30.000Z");
  assert.equal(parseIsoDateTimeUTC("2020-01-02T10:20:30.000Z"), null);
  assert.equal(parseIsoDateTimeUTC("not-a-date"), null);
});

test("isSameUtcMonth", () => {
  const a = new Date(Date.UTC(2020, 0, 1));
  const b = new Date(Date.UTC(2020, 0, 31, 23));
  const c = new Date(Date.UTC(2020, 1, 1));
  assert.equal(isSameUtcMonth(a, b), true);
  assert.equal(isSameUtcMonth(a, c), false);
});
