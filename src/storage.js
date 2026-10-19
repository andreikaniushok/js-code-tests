const KEY = "polygon-js-skills-v1";

export function emptyState() {
  return { code: {}, manual: {}, results: {}, lastTaskId: null };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyState();
    const data = JSON.parse(raw);
    return {
      code: data.code || {},
      manual: data.manual || {},
      results: data.results || {},
      lastTaskId: data.lastTaskId || null,
    };
  } catch {
    return emptyState();
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function hashCode(text) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
}
