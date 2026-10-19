import { assembleSection } from "./assemble.js";
import { SECTIONS } from "./sections.js";
import logicSolution from "../tasks/01. logic/solution.js?raw";
import logicTests from "../tasks/01. logic/tests.test.js?raw";
import stringsSolution from "../tasks/02. strings/solution.js?raw";
import stringsTests from "../tasks/02. strings/tests.test.js?raw";
import numbersSolution from "../tasks/03. numbers/solution.js?raw";
import numbersTests from "../tasks/03. numbers/tests.test.js?raw";
import arraysSolution from "../tasks/04. arrays/solution.js?raw";
import arraysTests from "../tasks/04. arrays/tests.test.js?raw";
import objectsSolution from "../tasks/05. objects/solution.js?raw";
import objectsTests from "../tasks/05. objects/tests.test.js?raw";
import functionsSolution from "../tasks/06. functions/solution.js?raw";
import functionsTests from "../tasks/06. functions/tests.test.js?raw";
import strings2Solution from "../tasks/07. strings-2/solution.js?raw";
import strings2Tests from "../tasks/07. strings-2/tests.test.js?raw";
import collectionsSolution from "../tasks/08. collections/solution.js?raw";
import collectionsTests from "../tasks/08. collections/tests.test.js?raw";
import datesSolution from "../tasks/09. dates/solution.js?raw";
import datesTests from "../tasks/09. dates/tests.test.js?raw";
import regexSolution from "../tasks/10. regex/solution.js?raw";
import regexTests from "../tasks/10. regex/tests.test.js?raw";
import algorithmsSolution from "../tasks/11. algorithms/solution.js?raw";
import algorithmsTests from "../tasks/11. algorithms/tests.test.js?raw";
import asyncSolution from "../tasks/12. async/solution.js?raw";
import asyncTests from "../tasks/12. async/tests.test.js?raw";

const SOURCES = {
  logic: [logicSolution, logicTests],
  strings: [stringsSolution, stringsTests],
  numbers: [numbersSolution, numbersTests],
  arrays: [arraysSolution, arraysTests],
  objects: [objectsSolution, objectsTests],
  functions: [functionsSolution, functionsTests],
  "strings-2": [strings2Solution, strings2Tests],
  collections: [collectionsSolution, collectionsTests],
  dates: [datesSolution, datesTests],
  regex: [regexSolution, regexTests],
  algorithms: [algorithmsSolution, algorithmsTests],
  async: [asyncSolution, asyncTests],
};

export const catalog = SECTIONS.map((section) => {
  const [solution, tests] = SOURCES[section.id];
  return assembleSection(section, solution, tests);
});

export function findTask(sectionId, taskName) {
  const section = catalog.find((item) => item.id === sectionId);
  const task = section?.tasks.find((item) => item.name === taskName);
  if (!section || !task) return null;
  return { section, task };
}
