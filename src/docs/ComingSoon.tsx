import type { ReactNode } from 'react';

const PHASE_LABEL = {
  implementation: 'Currently under implementation',
  planned: 'Planned for an upcoming milestone',
} as const;

export interface ComingSoonProps {
  /** What exists today — a Figma component, a Product pattern, or nothing yet. */
  status: ReactNode;
  /**
   * `implementation` — actively next in line to be built.
   * `planned` (default) — on the roadmap, not yet scheduled.
   */
  phase?: keyof typeof PHASE_LABEL;
  children?: ReactNode;
}

/**
 * Rendered on documentation pages for sidebar entries that reflect Atlas
 * UI's intended shape but aren't implemented yet. This is deliberately not
 * a fake/placeholder component — it's an honest "not built" marker, so the
 * navigation can show the system's full intended IA without pretending
 * unbuilt components exist. Copy is intentionally not "Coming soon" — the
 * badge states where each item actually stands, not a vague placeholder.
 */
export function ComingSoon({ status, phase = 'planned', children }: ComingSoonProps) {
  return (
    <div className="atlas-doc-stub">
      <span className="atlas-doc-stub__badge">{PHASE_LABEL[phase]}</span>
      <p className="atlas-doc-stub__desc">{status}</p>
      {children}
    </div>
  );
}
