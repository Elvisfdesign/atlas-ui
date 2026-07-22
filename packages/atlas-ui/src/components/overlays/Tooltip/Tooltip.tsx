import { type ReactNode } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { cn } from '@/utils/cn';

/**
 * Atlas Tooltip.
 * Source: Atlas UI System, 10 — Overlays → Overlay / Tooltip
 * (152×27 auto-width, padding 6/10, radius 6, `background-inverse` fill,
 * `background-surface` text, Inter Regular 11px, no drop shadow).
 *
 * Built on Radix's Tooltip primitive: it owns the hard accessibility
 * problems (hover-intent delay, Escape-to-dismiss, focus dismissal,
 * `aria-describedby` wiring, portal + collision-aware positioning) that a
 * hand-rolled tooltip would otherwise get wrong.
 */
export interface TooltipProps {
  /** The tooltip's text content. */
  content: ReactNode;
  /** The element that triggers the tooltip on hover/focus. Must accept a ref (any DOM element or Atlas component works). */
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Delay, in ms, before the tooltip appears on hover. Matches Atlas's `duration.instant` (80ms) by default. */
  delayDuration?: number;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Tooltip({
  content,
  children,
  side = 'top',
  delayDuration = 80,
  defaultOpen,
  open,
  onOpenChange,
}: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            sideOffset={6}
            className={cn(
              'z-tooltip rounded-sm bg-inverse px-2.5 py-1.5',
              'font-sans text-[11px] leading-4 text-surface',
              'select-none'
            )}
          >
            {content}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
