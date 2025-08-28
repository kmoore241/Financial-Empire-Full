
export const getLS = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
export const setLS = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
};
export const delLS = (key) => {
  try { localStorage.removeItem(key); } catch {}
};
