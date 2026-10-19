import { parseSolution, parseTests, testsForFunction } from "./parse.js";
import { extractExamples } from "./examples.js";

export function assembleSection(meta, solutionSource, testSource) {
  const tasks = parseSolution(solutionSource, meta.id);
  const parsedTests = parseTests(testSource);
  const names = tasks.map((task) => task.name);

  return {
    ...meta,
    prelude: parsedTests.prelude,
    tasks: tasks.map((task) => {
      const tests = testsForFunction(parsedTests, task.name, names);
      return {
        ...task,
        tests,
        examples: extractExamples(tests, task.name),
      };
    }),
  };
}
