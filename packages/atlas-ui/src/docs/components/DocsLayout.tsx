import type { ReactNode } from 'react';

/**
 * Atlas documentation layout system.
 *
 * Every Storybook doc page (Foundations, component docs, stubs) is built
 * from this fixed set of components instead of hand-written headings and
 * per-page margin CSS. That's the whole point of this file: spacing lives
 * here, once, as component behavior — not as a CSS selector guessing at a
 * page's raw markdown structure. A page's rhythm can't drift because a
 * page's rhythm isn't a property of the page; it's a property of these
 * components.
 *
 * The rhythm (see docs.css, "Documentation spacing system" block, for the
 * token values):
 *
 *   DocsLayout
 *     DocsTitle              (h1)
 *     ↓ 32px
 *     DocsIntro              (lede paragraph)
 *     ↓ 56px
 *     DocsSection            (renders its own leading divider)
 *       divider              24px tall rule
 *       ↓ 40px
 *       heading (h2)
 *       ↓ 24px
 *       body                 prose, cards, tables, code, lists
 *     DocsSection
 *     ...
 *
 * Within a section's body, the spacing between prose and a card/table/code
 * block is handled by docs.css targeting the existing grid/preview classes
 * as descendants of `.docs-section__body` — that's what makes "Cards: 32
 * above / 48 below" (etc.) apply uniformly without a wrapper component for
 * every single grid variant already in use across Foundations pages.
 */

export interface DocsLayoutProps {
  children: ReactNode;
}

/** Root wrapper for a documentation page's entire body (everything after
 *  `<Meta />`). Establishes the page's reading measure and hands off
 *  vertical rhythm to its DocsTitle/DocsIntro/DocsSection children. */
export function DocsLayout({ children }: DocsLayoutProps) {
  return <div className="docs-layout">{children}</div>;
}

export interface DocsTitleProps {
  children: ReactNode;
}

/** The single "# Name" every documentation page opens with. */
export function DocsTitle({ children }: DocsTitleProps) {
  return <h1 className="docs-title">{children}</h1>;
}

export interface DocsIntroProps {
  children: ReactNode;
}

/** The one lede paragraph directly under the title. */
export function DocsIntro({ children }: DocsIntroProps) {
  return <p className="docs-intro">{children}</p>;
}

/**
 * Hairline section rule. `DocsSection` renders one of these automatically
 * before its heading — reach for this directly only for a one-off divider
 * that sits outside the section rhythm (rare).
 */
export function DocsDivider() {
  return <hr className="docs-divider" />;
}

export interface DocsSectionProps {
  /** Heading text, rendered as an h2. */
  title: string;
  children: ReactNode;
}

/**
 * The one reusable unit every "## Section" on a documentation page is
 * built from: a divider, the heading, then its body — always in that
 * order, always with the same spacing. A doc page is nothing but a
 * DocsTitle, a DocsIntro, and a sequence of these.
 */
export function DocsSection({ title, children }: DocsSectionProps) {
  return (
    <section className="docs-section">
      <DocsDivider />
      <h2 className="docs-section__title">{title}</h2>
      <div className="docs-section__body">{children}</div>
    </section>
  );
}

export interface DocsSubheadingProps {
  children: ReactNode;
}

/** An "### X" subheading inside a DocsSection's body — used sparingly,
 *  e.g. splitting Controls from the full ArgTypes table under "React
 *  Props." Not a rhythm anchor of its own; it inherits the section's
 *  body spacing. */
export function DocsSubheading({ children }: DocsSubheadingProps) {
  return <h3 className="docs-subheading">{children}</h3>;
}
