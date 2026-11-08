/** Theme persistence: prefers-color-scheme when unset, fallback dark. */

export const THEME_STORAGE_KEY = "theme";

export function resolveTheme() {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme === "light" ? "light" : "";
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function getThemeSnapshot() {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function subscribeTheme(onStoreChange) {
  const onMedia = () => onStoreChange();
  window.addEventListener("theme-change", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onMedia);
  return () => {
    window.removeEventListener("theme-change", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
    mq.removeEventListener("change", onMedia);
  };
}

export function setTheme(theme) {
  applyTheme(theme);
  window.dispatchEvent(new Event("theme-change"));
}
