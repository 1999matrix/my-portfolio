import { useSyncExternalStore } from "react";

function subscribeMediaQuery(query, onChange) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** @param {string} query @param {boolean} serverFallback */
export function useMediaQuery(query, serverFallback = false) {
  return useSyncExternalStore(
    (onChange) => subscribeMediaQuery(query, onChange),
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}
