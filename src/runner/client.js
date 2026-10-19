import { runnerCopy } from "../i18n/runnerCopy.js";

let worker = null;
let sequence = 0;

function spawn() {
  worker = new Worker(new URL("./worker.js", import.meta.url), { type: "module" });
  return worker;
}

export function runInWorker(payload, timeoutMs = 15000) {
  const copy = runnerCopy(payload?.locale);
  const id = ++sequence;
  const current = worker || spawn();

  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      current.terminate();
      worker = null;
      resolve({
        hung: true,
        error: copy.hung,
        results: [],
      });
    }, timeoutMs);

    const finish = (outcome) => {
      clearTimeout(timer);
      current.removeEventListener("message", onMessage);
      current.removeEventListener("error", onError);
      resolve(outcome);
    };

    const onMessage = (event) => {
      if (event.data?.id !== id) return;
      finish(event.data);
    };

    const onError = (event) => {
      finish({ error: event.message || copy.worker, results: [] });
    };

    current.addEventListener("message", onMessage);
    current.addEventListener("error", onError);
    current.postMessage({ id, ...payload });
  });
}
