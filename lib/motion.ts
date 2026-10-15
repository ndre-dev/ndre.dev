// Shared by every animated piece of the page.

// True when the visitor asked for reduced motion.
export function prefersStill() {
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
}
