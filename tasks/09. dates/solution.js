/**
 * Task: Return "YYYY-MM-DD" for date in UTC.
 * Input: date — Date.
 * Output: string.
 *
 * @param {Date} date
 * @returns {string}
 */
export function formatDateUTC(date) {
  // TODO: implement. Example: new Date(Date.UTC(2020, 0, 2, 10, 20, 30)) => "2020-01-02"
  if (!(date instanceof Date)) return "1970-01-01";
  return date.toISOString().slice(0, 10);
}

/**
 * Task: Parse "YYYY-MM-DD" and return a Date at UTC midnight.
 * Input: s — string.
 * Output: Date.
 *
 * @param {string} s
 * @returns {Date}
 */
export function parseDateUTC(s) {
  // TODO: implement. Example: "2020-01-02" => new Date("2020-01-02T00:00:00.000Z")
  return new Date(String(s ?? ""));
}

/**
 * Task: Add days in UTC and return a new Date (do not mutate the input).
 * Input: date — Date; days — number (integer).
 * Output: Date.
 *
 * @param {Date} date
 * @param {number} days
 * @returns {Date}
 */
export function addDaysUTC(date, days) {
  // TODO: implement. Example: new Date(Date.UTC(2020, 0, 31)), 1 => new Date(\"2020-02-01T00:00:00.000Z\")
  void days;
  return new Date(date);
}

/**
 * Task: Absolute number of full days between dates in UTC.
 * Input: a — Date; b — Date.
 * Output: number.
 *
 * @param {Date} a
 * @param {Date} b
 * @returns {number}
 */
export function daysBetweenUTC(a, b) {
  // TODO: implement. Example: new Date(Date.UTC(2020, 0, 1)), new Date(Date.UTC(2020, 0, 10)) => 9
  void a;
  void b;
  return 0;
}

/**
 * Task: true if dates fall on the same UTC day.
 * Input: a — Date; b — Date.
 * Output: boolean.
 *
 * @param {Date} a
 * @param {Date} b
 * @returns {boolean}
 */
export function isSameUtcDay(a, b) {
  // TODO: implement. Example: new Date(Date.UTC(2020, 0, 1, 0, 0, 0)), new Date(Date.UTC(2020, 0, 2, 0, 0, 0)) => false
  void a;
  void b;
  return false;
}

/**
 * Task: Return a new Date at 00:00:00.000Z of that day.
 * Input: date — Date.
 * Output: Date.
 *
 * @param {Date} date
 * @returns {Date}
 */
export function startOfUtcDay(date) {
  // TODO: implement. Example: new Date("1970-01-01T00:00:00Z") => new Date("1970-01-02T00:00:00.000Z")
  return new Date(date);
}

/**
 * Task: Return a new Date at 23:59:59.999Z of that day.
 * Input: date — Date.
 * Output: Date.
 *
 * @param {Date} date
 * @returns {Date}
 */
export function endOfUtcDay(date) {
  // TODO: implement. Example: new Date("1970-01-01T00:00:00Z") => new Date("1970-01-02T00:00:00.000Z")
  return new Date(date);
}

/**
 * Task: Add hours in UTC and return a new Date.
 * Input: date — Date; hours — number (integer).
 * Output: Date.
 *
 * @param {Date} date
 * @param {number} hours
 * @returns {Date}
 */
export function addHoursUTC(date, hours) {
  // TODO: implement. Example: new Date("1970-01-01T00:00:00Z"), 3 => new Date("1970-01-02T00:00:00.000Z")
  void hours;
  return new Date(date);
}

/**
 * Task: Add minutes in UTC and return a new Date.
 * Input: date — Date; minutes — number (integer).
 * Output: Date.
 *
 * @param {Date} date
 * @param {number} minutes
 * @returns {Date}
 */
export function addMinutesUTC(date, minutes) {
  // TODO: implement. Example: new Date("1970-01-01T00:00:00Z"), 3 => new Date("1970-01-02T00:00:00.000Z")
  void minutes;
  return new Date(date);
}

/**
 * Task: Add months (UTC) and return a new Date (handle day overflow adjustment).
 * Input: date — Date; months — number (integer).
 * Output: Date.
 *
 * @param {Date} date
 * @param {number} months
 * @returns {Date}
 */
export function addMonthsUTC(date, months) {
  // TODO: implement. Example: new Date("1970-01-01T00:00:00Z"), 3 => new Date("1970-01-02T00:00:00.000Z")
  void months;
  return new Date(date);
}

/**
 * Task: Add years (UTC) and return a new Date.
 * Input: date — Date; years — number (integer).
 * Output: Date.
 *
 * @param {Date} date
 * @param {number} years
 * @returns {Date}
 */
export function addYearsUTC(date, years) {
  // TODO: implement. Example: new Date("1970-01-01T00:00:00Z"), 3 => new Date("1970-01-02T00:00:00.000Z")
  void years;
  return new Date(date);
}

/**
 * Task: true if a < b by time (getTime()).
 * Input: a — Date; b — Date.
 * Output: boolean.
 *
 * @param {Date} a
 * @param {Date} b
 * @returns {boolean}
 */
export function isBeforeUTC(a, b) {
  // TODO: implement. Example: new Date("1970-01-01T00:00:00Z"), new Date("1970-01-01T00:00:00Z") => true
  void a;
  void b;
  return false;
}

/**
 * Task: true if a > b by time (getTime()).
 * Input: a — Date; b — Date.
 * Output: boolean.
 *
 * @param {Date} a
 * @param {Date} b
 * @returns {boolean}
 */
export function isAfterUTC(a, b) {
  // TODO: implement. Example: new Date("1970-01-01T00:00:00Z"), new Date("1970-01-01T00:00:00Z") => true
  void a;
  void b;
  return false;
}

/**
 * Task: Clamp date into the [min..max] range (UTC).
 * Input: date — Date; min — Date; max — Date.
 * Output: Date.
 *
 * @param {Date} date
 * @param {Date} min
 * @param {Date} max
 * @returns {Date}
 */
export function clampDateUTC(date, min, max) {
  // TODO: implement. Example: new Date("1970-01-01T00:00:00Z"), new Date("1970-01-01T00:00:00Z"), new Date("1970-01-01T00:00:00Z") => new Date("1970-01-02T00:00:00.000Z")
  void min;
  void max;
  return new Date(date);
}

/**
 * Task: Return "HH:MM:SS" in UTC (with leading zeros).
 * Input: date — Date.
 * Output: string.
 *
 * @param {Date} date
 * @returns {string}
 */
export function formatTimeUTC(date) {
  // TODO: implement. Example: new Date("1970-01-01T00:00:00Z") => "hello"
  void date;
  return "00:00:00";
}

/**
 * Task: Strictly parse "HH:MM:SS" and return {h,m,s} or null.
 * Input: s — string.
 * Output: {h:number,m:number,s:number} | null.
 *
 * @param {string} s
 * @returns {{h:number,m:number,s:number}|null}
 */
export function parseTimeUTC(s) {
  // TODO: implement. Example: "hello" => 1
  void s;
  return null;
}

/**
 * Task: Return "YYYY-MM-DDTHH:MM:SSZ" (UTC, without milliseconds).
 * Input: date — Date.
 * Output: string.
 *
 * @param {Date} date
 * @returns {string}
 */
export function formatDateTimeUTC(date) {
  // TODO: implement. Example: new Date("1970-01-01T00:00:00Z") => "hello"
  void date;
  return "1970-01-01T00:00:00Z";
}

/**
 * Task: Weekday in UTC: 0..6 (0=Sun).
 * Input: date — Date.
 * Output: number.
 *
 * @param {Date} date
 * @returns {number}
 */
export function getWeekdayUTC(date) {
  // TODO: implement. Example: new Date("1970-01-01T00:00:00Z") => 1
  void date;
  return 0;
}

/**
 * Task: true if the UTC day is Saturday or Sunday.
 * Input: date — Date.
 * Output: boolean.
 *
 * @param {Date} date
 * @returns {boolean}
 */
export function isWeekendUTC(date) {
  // TODO: implement. Example: new Date("1970-01-01T00:00:00Z") => true
  void date;
  return false;
}

/**
 * Task: Number of days in the month (monthIndex 0..11) in UTC.
 * Input: year — number; monthIndex — number (0..11).
 * Output: number.
 *
 * @param {number} year
 * @param {number} monthIndex
 * @returns {number}
 */
export function daysInMonthUTC(year, monthIndex) {
  // TODO: implement. Example: 3, 3 => 0
  void year;
  void monthIndex;
  return 0;
}

/**
 * Task: true if value is a Date and not NaN.
 * Input: value — any.
 * Output: boolean.
 *
 * @param {any} value
 * @returns {boolean}
 */
export function isValidDate(value) {
  // TODO: implement. Example: { a: 1, b: 2 } => true
  void value;
  return false;
}

/**
 * Task: Timestamp in seconds since 1970-01-01T00:00:00Z.
 * Input: date — Date.
 * Output: number.
 *
 * @param {Date} date
 * @returns {number}
 */
export function toUnixSeconds(date) {
  // TODO: implement. Example: new Date("1970-01-01T00:00:00Z") => 1
  void date;
  return 0;
}

/**
 * Task: Date from unix-seconds.
 * Input: sec — number.
 * Output: Date.
 *
 * @param {number} sec
 * @returns {Date}
 */
export function fromUnixSeconds(sec) {
  // TODO: implement. Example: 3 => new Date("1970-01-02T00:00:00.000Z")
  void sec;
  return new Date(0);
}

/**
 * Task: Strictly parse "YYYY-MM-DDTHH:MM:SSZ" into Date, otherwise null.
 * Input: s — string.
 * Output: Date | null.
 *
 * @param {string} s
 * @returns {Date|null}
 */
export function parseIsoDateTimeUTC(s) {
  // TODO: implement. Example: "hello" => new Date("1970-01-02T00:00:00.000Z")
  void s;
  return null;
}

/**
 * Task: true if year and month match in UTC.
 * Input: a — Date; b — Date.
 * Output: boolean.
 *
 * @param {Date} a
 * @param {Date} b
 * @returns {boolean}
 */
export function isSameUtcMonth(a, b) {
  // TODO: implement. Example: new Date("1970-01-01T00:00:00Z"), new Date("1970-01-01T00:00:00Z") => true
  void a;
  void b;
  return false;
}

