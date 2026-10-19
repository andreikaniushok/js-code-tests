import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { editorOptions, monaco } from "../monacoSetup.js";

function problemLabel(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  const word = mod10 === 1 && mod100 !== 11 ? "ошибка" : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14) ? "ошибки" : "ошибок";
  return `${count} ${word}`;
}

export function CodeEditor({ fileName, path, initialCode, onChange, onRun, running, canRun }) {
  const editorRef = useRef(null);
  const onRunRef = useRef(onRun);
  const [cursor, setCursor] = useState({ line: 1, column: 1 });
  const [problems, setProblems] = useState(0);
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    onRunRef.current = onRun;
  }, [onRun]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        setSaved(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function handleMount(editor) {
    editorRef.current = editor;
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => onRunRef.current?.());
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => setSaved(true));
    editor.onDidChangeCursorPosition((event) => {
      setCursor({ line: event.position.lineNumber, column: event.position.column });
    });
    const subscription = monaco.editor.onDidChangeMarkers(() => {
      const model = editor.getModel();
      if (!model) return;
      const markers = monaco.editor.getModelMarkers({ resource: model.uri });
      setProblems(markers.filter((marker) => marker.severity === monaco.MarkerSeverity.Error).length);
    });
    editor.onDidDispose(() => subscription.dispose());
    editor.focus();
  }

  function formatDocument() {
    editorRef.current?.getAction("editor.action.formatDocument")?.run();
  }

  return (
    <section className="editor-frame">
      <div className="tabbar">
        <div className="tab active">
          <span className="tab-dot" />
          {fileName}
        </div>
        <div className="tab-actions">
          <button type="button" className="btn ghost" onClick={formatDocument}>
            Форматировать
          </button>
          <button type="button" className="btn primary" onClick={onRun} disabled={!canRun || running}>
            {running ? "Проверка…" : canRun ? "Проверить" : "Нет тестов"}
            {canRun ? <kbd>Ctrl+Enter</kbd> : null}
          </button>
        </div>
      </div>
      <div className="editor-body">
        <Editor
          path={path}
          defaultLanguage="javascript"
          defaultValue={initialCode}
          theme="polygon"
          options={editorOptions}
          loading={<div className="editor-loading">Загрузка редактора…</div>}
          onMount={handleMount}
          onChange={(value) => {
            if (typeof value === "string") onChange(value);
            setSaved(true);
          }}
        />
      </div>
      <div className="statusbar">
        <span>
          Стр. {cursor.line}, кол. {cursor.column}
        </span>
        <span>Пробелы: 2</span>
        <span>UTF-8</span>
        <span>{problems ? problemLabel(problems) : "ошибок нет"}</span>
        <span className="status-grow">{saved ? "Сохранено в браузере" : "Сохранение…"}</span>
        <span>JavaScript</span>
      </div>
    </section>
  );
}
