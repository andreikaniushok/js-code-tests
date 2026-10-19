import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translate } from "./messages.js";
import { setSnippetLocale } from "../monacoSetup.js";

const STORAGE_KEY = "polygon-lang";
const LocaleContext = createContext(null);

export function detectLocale() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "ru") return stored;
  } catch {
    // Private mode can block storage; fall through to the browser language.
  }
  if (typeof navigator !== "undefined" && String(navigator.language || "").toLowerCase().startsWith("en")) {
    return "en";
  }
  return "ru";
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(detectLocale);

  const setLocale = useCallback((next) => {
    const value = next === "en" ? "en" : "ru";
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // The choice still applies for this session.
    }
    setLocaleState(value);
  }, []);

  setSnippetLocale(locale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback((key, vars) => translate(locale, key, vars), [locale]);
  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useI18n must be used inside LocaleProvider");
  return value;
}
