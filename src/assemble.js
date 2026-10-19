import { parseSolution, parseTests, testsForFunction } from "./parse.js";

export function assembleSection(meta, solutionSource, testSource) {
  const tasks = parseSolution(solutionSource, meta.id);
  const parsedTests = parseTests(testSource);
  const names = tasks.map((task) => task.name);

  return {
    ...meta,
    prelude: parsedTests.prelude,
    tasks: tasks.map((task) => ({
      ...task,
      tests: testsForFunction(parsedTests, task.name, names),
    })),
  };
}
