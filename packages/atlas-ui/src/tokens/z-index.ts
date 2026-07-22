/**
 * Atlas z-index scale. Not sourced from a Figma variable (Figma has no
 * z-index concept) — this is the one token category the UI implementation
 * must define itself. Kept small and semantic on purpose: name the layer,
 * not the number.
 */
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500,
  toast: 1600,
} as const;

export type ZIndexToken = keyof typeof zIndex;
