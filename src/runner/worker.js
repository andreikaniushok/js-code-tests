import { runProgram } from "./runProgram.js";

self.onmessage = async (event) => {
  const { id, prelude, tests, userCode, locale } = event.data;
  try {
    const outcome = await runProgram({ prelude, tests, userCode, locale });
    self.postMessage({ id, ...outcome });
  } catch (error) {
    self.postMessage({
      id,
      error: error instanceof Error ? error.message : String(error),
      results: [],
    });
  }
};
