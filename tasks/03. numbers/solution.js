/**
 * Task: GCD (Euclid). Result is non-negative.
 * Note: Handle negative inputs (see tests).
 * Input: a — number; b — number (expected integers).
 * Output: number.
 *
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function gcd(a, b) {
  // TODO: implement. Example: 54, 24 => 6
  void a;
  void b;
  return 0;
}

/**
 * Task: LCM. Result is non-negative (if a==0 or b==0 → 0).
 * Note: Handle negative inputs (see tests).
 * Input: a — number; b — number (expected integers).
 * Output: number.
 *
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function lcm(a, b) {
  // TODO: implement. Example: 6, 8 => 24
  void a;
  void b;
  return 0;
}

/**
 * Task: true only for 1,2,4,8,... (powers of two). 0 → false.
 * Input: n — number (integer).
 * Output: boolean.
 *
 * @param {number} n
 * @returns {boolean}
 */
export function isPowerOfTwo(n) {
  // TODO: implement. Example: 1 => true
  void n;
  return false;
}

/**
 * Task: Round value to the nearest step (e.g. 0.05).
 * Note: Works for negative values too (see tests).
 * Input: value — number; step — number (>0).
 * Output: number.
 *
 * @param {number} value
 * @param {number} step
 * @returns {number}
 */
export function roundToStep(value, step) {
  // TODO: implement. Example: 1.02, 0.05 => 1.0
  void step;
  return Number(value ?? 0);
}

/**
 * Task: Format bytes using 1024: "0 B", "1 KB", "1.5 KB", "1 MB", ...
 * Note: Show 1 decimal only when needed (see tests).
 * Input: bytes — number (integer >= 0).
 * Output: string.
 *
 * @param {number} bytes
 * @returns {string}
 */
export function formatBytes(bytes) {
  // TODO: implement. Example: 0 => "0 B"
  return `${Number(bytes ?? 0)} B`;
}

/**
 * Task: Clamp n to [min..max].
 * Input: n — number; min — number; max — number.
 * Output: number.
 *
 * @param {number} n
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clampNumber(n, min, max) {
  // TODO: implement. Example: 3, 3, 3 => 1
  void min;
  void max;
  return Number(n ?? 0);
}

/**
 * Task: Return -1 / 0 / 1 depending on the sign of n.
 * Input: n — number.
 * Output: -1 | 0 | 1.
 *
 * @param {number} n
 * @returns {-1|0|1}
 */
export function signum(n) {
  // TODO: implement. Example: 3 => undefined
  void n;
  return 0;
}

/**
 * Task: Mathematical mod (for m>0 result is 0..m-1).
 * Input: n — number; m — number (m > 0).
 * Output: number.
 *
 * @param {number} n
 * @param {number} m
 * @returns {number}
 */
export function mod(n, m) {
  // TODO: implement. Example: 3, 3 => 1
  void n;
  void m;
  return 0;
}

/**
 * Task: true only for even integers.
 * Input: n — number.
 * Output: boolean.
 *
 * @param {number} n
 * @returns {boolean}
 */
export function isEven(n) {
  // TODO: implement. Example: 3 => true
  void n;
  return false;
}

/**
 * Task: true only for odd integers.
 * Input: n — number.
 * Output: boolean.
 *
 * @param {number} n
 * @returns {boolean}
 */
export function isOdd(n) {
  // TODO: implement. Example: 3 => true
  void n;
  return false;
}

/**
 * Task: Sum of a number array (empty → 0).
 * Input: arr — number[].
 * Output: number.
 *
 * @param {number[]} arr
 * @returns {number}
 */
export function sumNumbers(arr) {
  // TODO: implement. Example: 3 => 6
  void arr;
  return 0;
}

/**
 * Task: Arithmetic mean (empty → NaN).
 * Input: arr — number[].
 * Output: number.
 *
 * @param {number[]} arr
 * @returns {number}
 */
export function mean(arr) {
  // TODO: implement. Example: 3 => 1
  void arr;
  return NaN;
}

/**
 * Task: Median (do not mutate input array).
 * Input: arr — number[].
 * Output: number.
 *
 * @param {number[]} arr
 * @returns {number}
 */
export function median(arr) {
  // TODO: implement. Example: 3 => 1
  void arr;
  return NaN;
}

/**
 * Task: Linear interpolation: a + (b-a)*t.
 * Input: a — number; b — number; t — number.
 * Output: number.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} t
 * @returns {number}
 */
export function lerp(a, b, t) {
  // TODO: implement. Example: 3, 3, 3 => 1
  void a;
  void b;
  void t;
  return 0;
}

/**
 * Task: Find t such that lerp(a,b,t)=value.
 * Input: a — number; b — number; value — number.
 * Output: number.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} value
 * @returns {number}
 */
export function inverseLerp(a, b, value) {
  // TODO: implement. Example: 3, 3, 3 => 1
  void a;
  void b;
  void value;
  return NaN;
}

/**
 * Task: Map value from range [inMin..inMax] to [outMin..outMax].
 * Input: value,inMin,inMax,outMin,outMax — number.
 * Output: number.
 *
 * @param {number} value
 * @param {number} inMin
 * @param {number} inMax
 * @param {number} outMin
 * @param {number} outMax
 * @returns {number}
 */
export function mapRange(value, inMin, inMax, outMin, outMax) {
  // TODO: implement. Example: 3, 3, 3, 3, 3 => 1
  void value;
  void inMin;
  void inMax;
  void outMin;
  void outMax;
  return NaN;
}

/**
 * Task: |a-b| <= eps.
 * Input: a — number; b — number; eps — number (defaults to 1e-9).
 * Output: boolean.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} [eps]
 * @returns {boolean}
 */
export function approxEqual(a, b, eps = 1e-9) {
  // TODO: implement. Example: 3, 3 => true
  void a;
  void b;
  void eps;
  return false;
}

/**
 * Task: Round to decimals digits after the decimal point.
 * Input: value — number; decimals — number (integer >=0).
 * Output: number.
 *
 * @param {number} value
 * @param {number} decimals
 * @returns {number}
 */
export function roundToDecimals(value, decimals) {
  // TODO: implement. Example: 3, 3 => 1
  void value;
  void decimals;
  return NaN;
}

/**
 * Task: Degrees → radians.
 * Input: deg — number.
 * Output: number.
 *
 * @param {number} deg
 * @returns {number}
 */
export function toRadians(deg) {
  // TODO: implement. Example: 3 => 1
  void deg;
  return NaN;
}

/**
 * Task: Radians → degrees.
 * Input: rad — number.
 * Output: number.
 *
 * @param {number} rad
 * @returns {number}
 */
export function toDegrees(rad) {
  // TODO: implement. Example: 3 => 1
  void rad;
  return NaN;
}

/**
 * Task: true if |value-target| <= tolerance.
 * Input: value — number; target — number; tolerance — number (>=0).
 * Output: boolean.
 *
 * @param {number} value
 * @param {number} target
 * @param {number} tolerance
 * @returns {boolean}
 */
export function isWithin(value, target, tolerance) {
  // TODO: implement. Example: 3, 3, 3 => true
  void value;
  void target;
  void tolerance;
  return false;
}

/**
 * Task: Clamp t to [0..1].
 * Input: t — number.
 * Output: number.
 *
 * @param {number} t
 * @returns {number}
 */
export function clamp01(t) {
  // TODO: implement. Example: 3 => 1
  void t;
  return 0;
}

/**
 * Task: Strictly parse a number with no spaces/suffixes, otherwise null.
 * Input: s — string.
 * Output: number | null.
 *
 * @param {string} s
 * @returns {number|null}
 */
export function parseNumberStrict(s) {
  // TODO: implement. Example: "hello" => 1
  void s;
  return null;
}

/**
 * Task: Number of digits after the decimal point (e.g. 1.230 → 3).
 * Input: value — number.
 * Output: number.
 *
 * @param {number} value
 * @returns {number}
 */
export function countDecimals(value) {
  // TODO: implement. Example: 3 => 1
  void value;
  return 0;
}

/**
 * Task: Normalize an angle in radians to (-π..π].
 * Input: rad — number.
 * Output: number.
 *
 * @param {number} rad
 * @returns {number}
 */
export function normalizeAngleRad(rad) {
  // TODO: implement. Example: 3 => 1
  void rad;
  return 0;
}

