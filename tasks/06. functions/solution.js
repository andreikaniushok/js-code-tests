/**
 * Task: Call fn only once; afterwards return the cached result.
 * Input: fn — (...args:any[])=>T.
 * Output: (...args:any[])=>T.
 *
 * @template T
 * @param {(...args:any[])=>T} fn
 * @returns {(...args:any[])=>T}
 */
export function once(fn) {
  // TODO: implement. Example: [1, "a"] => [1, 2]
  return (...args) => fn(...args);
}

/**
 * Task: Left-to-right composition: pipe(f,g)(x)=g(f(x)).
 * Input: ...fns — Function[].
 * Output: (x:any)=>any.
 *
 * @param  {...Function} fns
 * @returns {(x:any)=>any}
 */
export function pipe(...fns) {
  // TODO: implement. Example: (x)=>x => undefined
  return (x) => fns.reduce((v, f) => f(v), x);
}

/**
 * Task: Curry a 2-arg function: curry2(fn)(a)(b).
 * Input: fn — (a:A,b:B)=>R.
 * Output: (a:A)=>(b:B)=>R.
 *
 * @template A,B,R
 * @param {(a:A,b:B)=>R} fn
 * @returns {(a:A)=>(b:B)=>R}
 */
export function curry2(fn) {
  // TODO: implement. Example: add)(2)(3 => 5
  return (a) => (b) => fn(a, b);
}

/**
 * Task: Return a function that calls sideEffect(x) and returns x.
 * Input: sideEffect — (x:any)=>void.
 * Output: (x:any)=>any.
 *
 * @param {(x:any)=>void} sideEffect
 * @returns {(x:any)=>any}
 */
export function tap(sideEffect) {
  // TODO: implement. Example: (x)=>x => undefined
  return (x) => {
    sideEffect(x);
    return x;
  };
}

/**
 * Task: Memoization by key keyFn(...args).
 * Input: fn — (...args:any[])=>R; keyFn — (...args:any[])=>string.
 * Output: (...args:any[])=>R.
 *
 * @template R
 * @param {(...args:any[])=>R} fn
 * @param {(...args:any[])=>string} keyFn
 * @returns {(...args:any[])=>R}
 */
export function memoizeWithKey(fn, keyFn) {
  // TODO: implement. Example: [1, "a"], "hello" => [1, 2]
  void keyFn;
  return (...args) => fn(...args);
}

/**
 * Task: Right-to-left composition: compose(f,g)(x)=f(g(x)).
 * Input: ...fns — Function[].
 * Output: (x:any)=>any.
 *
 * @param  {...Function} fns
 * @returns {(x:any)=>any}
 */
export function compose(...fns) {
  // TODO: implement. Example: (x)=>x => "hello"
  return (x) => fns.reduceRight((v, f) => f(v), x);
}

/**
 * Task: Return x.
 * Input: x — T.
 * Output: T.
 *
 * @template T
 * @param {T} x
 * @returns {T}
 */
export function identity(x) {
  // TODO: implement. Example: null => undefined
  return x;
}

/**
 * Task: No-op function.
 * Input: —
 * Output: void.
 *
 * @returns {void}
 */
export function noop() {
  // TODO: implement. Example: () => undefined
}

/**
 * Task: Run fn(i) for i=0..n-1 and return an array of results.
 * Input: n — number (integer >= 0); fn — (i:number)=>T.
 * Output: T[].
 *
 * @template T
 * @param {number} n
 * @param {(i:number)=>T} fn
 * @returns {T[]}
 */
export function times(n, fn) {
  // TODO: implement. Example: 3, 3 => [1, 2]
  void n;
  void fn;
  return [];
}

/**
 * Task: Partial application from the left: (...rest)=>fn(...preset,...rest).
 * Input: fn — (...args:any[])=>R; preset — any[].
 * Output: (...rest:any[])=>R.
 *
 * @template R
 * @param {(...args:any[])=>R} fn
 * @param  {...any} preset
 * @returns {(...rest:any[])=>R}
 */
export function partial(fn, ...preset) {
  // TODO: implement. Example: (x)=>x, new Set([1, 2, 3]) => [1, 2]
  return (...rest) => fn(...preset, ...rest);
}

/**
 * Task: Partial application from the right: (...rest)=>fn(...rest,...preset).
 * Input: fn — (...args:any[])=>R; preset — any[].
 * Output: (...rest:any[])=>R.
 *
 * @template R
 * @param {(...args:any[])=>R} fn
 * @param  {...any} preset
 * @returns {(...rest:any[])=>R}
 */
export function partialRight(fn, ...preset) {
  // TODO: implement. Example: (x)=>x, new Set([1, 2, 3]) => [1, 2]
  return (...rest) => fn(...rest, ...preset);
}

/**
 * Task: Negate a predicate.
 * Input: predicate — (x:any)=>boolean.
 * Output: (x:any)=>boolean.
 *
 * @param {(x:any)=>boolean} predicate
 * @returns {(x:any)=>boolean}
 */
export function negate(predicate) {
  // TODO: implement. Example: (x)=>x => true
  return (x) => !predicate(x);
}

/**
 * Task: Return a function that always returns value.
 * Input: value — T.
 * Output: ()=>T.
 *
 * @template T
 * @param {T} value
 * @returns {()=>T}
 */
export function constant(value) {
  // TODO: implement. Example: null => undefined
  return () => value;
}

/**
 * Task: Wrapper: if fn throws, return onError(err).
 * Input: fn — (...args:any[])=>R; onError — (err:Error)=>R.
 * Output: (...args:any[])=>R.
 *
 * @template R
 * @param {(...args:any[])=>R} fn
 * @param {(err:Error)=>R} onError
 * @returns {(...args:any[])=>R}
 */
export function tryCatch(fn, onError) {
  // TODO: implement. Example: (x)=>x, (x)=>x => [1, 2]
  return (...args) => {
    try {
      return fn(...args);
    } catch (e) {
      return onError(/** @type {Error} */(e));
    }
  };
}

/**
 * Task: Run fn in a microtask and return a Promise of the result.
 * Input: fn — ()=>R.
 * Output: Promise<R>.
 *
 * @template R
 * @param {()=>R} fn
 * @returns {Promise<R>}
 */
export function defer(fn) {
  // TODO: implement. Example: (x)=>x => Promise (settles)
  return Promise.resolve().then(fn);
}

/**
 * Task: A Promise that resolves to value after ms.
 * Input: ms — number; value — T.
 * Output: Promise<T>.
 *
 * @template T
 * @param {number} ms
 * @param {T} value
 * @returns {Promise<T>}
 */
export function delay(ms, value) {
  // TODO: implement. Example: 3, null => Promise (settles)
  void ms;
  return Promise.resolve(value);
}

/**
 * Task: once for async: cache a single promise.
 * Input: fn — ()=>Promise<R>.
 * Output: ()=>Promise<R>.
 *
 * @template R
 * @param {()=>Promise<R>} fn
 * @returns {()=>Promise<R>}
 */
export function onceAsync(fn) {
  // TODO: implement. Example: (x)=>x => Promise (settles)
  return () => fn();
}

/**
 * Task: Memoization by JSON.stringify(args) (for simple arguments).
 * Input: fn — (...args:any[])=>R.
 * Output: (...args:any[])=>R.
 *
 * @template R
 * @param {(...args:any[])=>R} fn
 * @returns {(...args:any[])=>R}
 */
export function memoize(fn) {
  // TODO: implement. Example: (x)=>x => [1, 2]
  return (...args) => fn(...args);
}

/**
 * Task: Call fn up to attempts times (sync) until it stops throwing; otherwise throw the last error.
 * Input: fn — ()=>R; attempts — number (integer >= 1).
 * Output: R.
 *
 * @template R
 * @param {()=>R} fn
 * @param {number} attempts
 * @returns {R}
 */
export function withRetries(fn, attempts) {
  // TODO: implement. Example: (x)=>x, 3 => undefined
  void attempts;
  return fn();
}

/**
 * Task: Return { result, ms } — result and execution time in milliseconds.
 * Input: fn — ()=>R.
 * Output: {result:R, ms:number}.
 *
 * @template R
 * @param {()=>R} fn
 * @returns {{result:R, ms:number}}
 */
export function measure(fn) {
  // TODO: implement. Example: (x)=>x => 1
  const start = Date.now();
  const result = fn();
  return { result, ms: Date.now() - start };
}

/**
 * Task: Return (...args)=>wrapper(fn,...args).
 * Input: fn — (...args:any[])=>R; wrapper — (fn,...args)=>R.
 * Output: (...args:any[])=>R.
 *
 * @template R
 * @param {(...args:any[])=>R} fn
 * @param {(fn:(...args:any[])=>R, ...args:any[])=>R} wrapper
 * @returns {(...args:any[])=>R}
 */
export function wrap(fn, wrapper) {
  // TODO: implement. Example: (x)=>x, (x)=>x => [1, 2]
  return (...args) => wrapper(fn, ...args);
}

/**
 * Task: Swap 2 args: (b,a)=>fn(a,b).
 * Input: fn — (a:A,b:B)=>R.
 * Output: (b:B,a:A)=>R.
 *
 * @template A,B,R
 * @param {(a:A,b:B)=>R} fn
 * @returns {(b:B,a:A)=>R}
 */
export function flip2(fn) {
  // TODO: implement. Example: (x)=>x => undefined
  return (b, a) => fn(a, b);
}

/**
 * Task: Wrapper that passes only 1 argument.
 * Input: fn — (...args:any[])=>R.
 * Output: (a:any)=>R.
 *
 * @template R
 * @param {(...args:any[])=>R} fn
 * @returns {(a:any)=>R}
 */
export function unary(fn) {
  // TODO: implement. Example: (x)=>x => "hello"
  return (a) => fn(a);
}

/**
 * Task: Wrapper that passes only 2 arguments.
 * Input: fn — (...args:any[])=>R.
 * Output: (a:any,b:any)=>R.
 *
 * @template R
 * @param {(...args:any[])=>R} fn
 * @returns {(a:any,b:any)=>R}
 */
export function binary(fn) {
  // TODO: implement. Example: (x)=>x => "hello"
  return (a, b) => fn(a, b);
}

/**
 * Task: Wrapper that passes only the first n arguments.
 * Input: fn — (...args:any[])=>R; n — number (integer >=0).
 * Output: (...args:any[])=>R.
 *
 * @template R
 * @param {(...args:any[])=>R} fn
 * @param {number} n
 * @returns {(...args:any[])=>R}
 */
export function nAry(fn, n) {
  // TODO: implement. Example: (x)=>x, 3 => [1, 2]
  void n;
  return (...args) => fn(...args);
}

