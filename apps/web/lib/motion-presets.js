/**
 * Motion/react transition presets aligned with styles/tokens/motion.css.
 */

/** @type {import("motion/react").Transition} */
export const springSnappy = {
  type: "spring",
  visualDuration: 0.3,
  bounce: 0.15,
};

/** @type {import("motion/react").Transition} */
export const springPanel = {
  type: "spring",
  visualDuration: 0.45,
  bounce: 0.2,
};

/** @type {import("motion/react").Transition} */
export const springDrift = {
  type: "spring",
  visualDuration: 0.6,
  bounce: 0.12,
};

/** @type {import("motion/react").Transition} */
export const easeOut = {
  duration: 0.25,
  ease: [0.22, 1, 0.36, 1],
};

/** @type {import("motion/react").Transition} */
export const easeEnter = {
  duration: 0.35,
  ease: [0.16, 1, 0.3, 1],
};

export const staggerChildren = {
  tight: 0.04,
  base: 0.06,
  relaxed: 0.09,
};
