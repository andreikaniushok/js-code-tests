import * as monaco from "monaco-editor";
import { loader } from "@monaco-editor/react";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import "monaco-editor/min/vs/editor/editor.main.css";

self.MonacoEnvironment = {
  getWorker(_workerId, label) {
    if (label === "typescript" || label === "javascript") return new tsWorker();
    return new editorWorker();
  },
};

loader.config({ monaco });

monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: false,
  noSyntaxValidation: false,
});
monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
  target: monaco.languages.typescript.ScriptTarget.ES2022,
  allowNonTsExtensions: true,
  allowJs: true,
  checkJs: true,
  lib: ["es2022", "dom"],
});

monaco.editor.defineTheme("polygon", {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "comment", foreground: "738278", fontStyle: "italic" },
    { token: "keyword", foreground: "d6ff4a" },
    { token: "string", foreground: "8ee0c2" },
    { token: "number", foreground: "e6c36a" },
    { token: "type", foreground: "9eb7ff" },
    { token: "identifier", foreground: "e7eee8" },
  ],
  colors: {
    "editor.background": "#101410",
    "editor.foreground": "#e7eee8",
    "editorLineNumber.foreground": "#55635b",
    "editorLineNumber.activeForeground": "#d6ff4a",
    "editor.selectionBackground": "#31441d",
    "editor.inactiveSelectionBackground": "#24301a",
    "editor.lineHighlightBackground": "#171d18",
    "editorCursor.foreground": "#d6ff4a",
    "editorWhitespace.foreground": "#2c3830",
    "editorIndentGuide.background1": "#24302a",
    "editorIndentGuide.activeBackground1": "#3d5144",
    "editorWidget.background": "#1b221c",
    "editorWidget.border": "#314038",
    "editorSuggestWidget.background": "#1b221c",
    "editorSuggestWidget.foreground": "#e7eee8",
    "editorSuggestWidget.selectedBackground": "#2d3b24",
    "editorSuggestWidget.selectedForeground": "#f4ffe0",
    "editorSuggestWidget.border": "#314038",
    "editorSuggestWidget.highlightForeground": "#d6ff4a",
    "editorHoverWidget.background": "#1b221c",
    "editorHoverWidget.border": "#314038",
    "editorBracketHighlight.foreground1": "#d6ff4a",
    "editorBracketHighlight.foreground2": "#8ee0c2",
    "editorBracketHighlight.foreground3": "#e6c36a",
    "scrollbarSlider.background": "#2a332d99",
    "scrollbarSlider.hoverBackground": "#3c4a4099",
    "editorGutter.background": "#101410",
  },
});

const SNIPPETS = [
  ["for", "for (let ${1:i} = 0; ${1:i} < ${2:items}.length; ${1:i}++) {\n\t$0\n}"],
  ["forof", "for (const ${1:item} of ${2:items}) {\n\t$0\n}"],
  ["forin", "for (const ${1:key} in ${2:object}) {\n\t$0\n}"],
  ["if", "if (${1:condition}) {\n\t$0\n}"],
  ["ife", "if (${1:condition}) {\n\t$2\n} else {\n\t$0\n}"],
  ["while", "while (${1:condition}) {\n\t$0\n}"],
  ["map", "${1:items}.map((${2:item}) => {\n\treturn $0;\n})"],
  ["filter", "${1:items}.filter((${2:item}) => $0)"],
  ["reduce", "${1:items}.reduce((${2:acc}, ${3:item}) => {\n\treturn ${2:acc};\n}, ${4:0})"],
  ["fn", "function ${1:name}(${2:args}) {\n\t$0\n}"],
  ["af", "(${1:args}) => {\n\t$0\n}"],
  ["try", "try {\n\t$1\n} catch (${2:error}) {\n\t$0\n}"],
  ["prom", "new Promise((resolve, reject) => {\n\t$0\n})"],
  ["timeout", "setTimeout(() => {\n\t$0\n}, ${1:0})"],
  ["cl", "console.log($0)"],
];

const SNIPPET_DETAIL = {
  ru: {
    for: "цикл for",
    forof: "цикл for...of",
    forin: "цикл for...in",
    if: "условие",
    ife: "if / else",
    while: "цикл while",
    map: "Array.map",
    filter: "Array.filter",
    reduce: "Array.reduce",
    fn: "function",
    af: "стрелочная функция",
    try: "try / catch",
    prom: "new Promise",
    timeout: "setTimeout",
    cl: "console.log",
  },
  en: {
    for: "for loop",
    forof: "for...of loop",
    forin: "for...in loop",
    if: "condition",
    ife: "if / else",
    while: "while loop",
    map: "Array.map",
    filter: "Array.filter",
    reduce: "Array.reduce",
    fn: "function",
    af: "arrow function",
    try: "try / catch",
    prom: "new Promise",
    timeout: "setTimeout",
    cl: "console.log",
  },
};

let snippetLocale = "ru";

export function setSnippetLocale(locale) {
  snippetLocale = locale === "en" ? "en" : "ru";
}

monaco.languages.registerCompletionItemProvider("javascript", {
  provideCompletionItems(model, position, context) {
    const word = model.getWordUntilPosition(position);
    const before = model.getLineContent(position.lineNumber).slice(0, Math.max(0, word.startColumn - 1));
    if (before.trimEnd().endsWith(".")) return { suggestions: [] };
    if (!word.word && context.triggerKind !== monaco.languages.CompletionTriggerKind.Invoke) {
      return { suggestions: [] };
    }
    const range = new monaco.Range(position.lineNumber, word.startColumn, position.lineNumber, word.endColumn);
    return {
      suggestions: SNIPPETS.map(([label, insertText]) => ({
        label,
        kind: monaco.languages.CompletionItemKind.Snippet,
        detail: SNIPPET_DETAIL[snippetLocale][label],
        insertText,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range,
        sortText: `5_${label}`,
      })),
    };
  },
});

export const editorOptions = {
  fontSize: 14,
  fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
  fontLigatures: true,
  lineHeight: 22,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 2,
  trimAutoWhitespace: false,
  insertSpaces: true,
  detectIndentation: false,
  wordWrap: "on",
  wrappingIndent: "indent",
  quickSuggestions: { other: true, comments: false, strings: true },
  quickSuggestionsDelay: 20,
  suggestOnTriggerCharacters: true,
  acceptSuggestionOnEnter: "on",
  acceptSuggestionOnCommitCharacter: true,
  tabCompletion: "on",
  snippetSuggestions: "inline",
  wordBasedSuggestions: "currentDocument",
  parameterHints: { enabled: true, cycle: true },
  hover: { enabled: true, delay: 180 },
  formatOnPaste: true,
  formatOnType: true,
  bracketPairColorization: { enabled: true },
  guides: { bracketPairs: true, indentation: true },
  matchBrackets: "always",
  smoothScrolling: true,
  cursorBlinking: "smooth",
  cursorSmoothCaretAnimation: "on",
  cursorWidth: 2,
  renderLineHighlight: "all",
  padding: { top: 14, bottom: 14 },
  scrollbar: { verticalScrollbarSize: 10, horizontalScrollbarSize: 10 },
  overviewRulerLanes: 0,
  hideCursorInOverviewRuler: true,
  renderWhitespace: "selection",
  fixedOverflowWidgets: true,
  suggest: {
    showKeywords: true,
    showSnippets: true,
    showFunctions: true,
    showMethods: true,
    showVariables: true,
    preview: true,
    showIcons: true,
    insertMode: "insert",
  },
  inlineSuggest: { enabled: true },
  stickyScroll: { enabled: false },
  semanticHighlighting: { enabled: true },
};

export { monaco };
