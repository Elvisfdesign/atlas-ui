import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/utils/cn';

/**
 * Atlas Tabs.
 * Source: Atlas Product — the Review Queue tabs row (All 12, Invoices 5,
 * Contracts 4, Receipts 3 — each a label + count). Built on
 * `@radix-ui/react-tabs` for roving-tabindex arrow-key navigation and
 * `Home`/`End` support, the same "use Radix for complex accessible
 * behavior" rationale as Tooltip.
 */
export const Tabs = TabsPrimitive.Root;

export const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'flex items-center gap-1 overflow-x-auto border-b border-border-default',
      className
    )}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

export interface TabProps extends ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  count?: string | number;
  children: ReactNode;
}

export const Tab = forwardRef<ElementRef<typeof TabsPrimitive.Trigger>, TabProps>(
  ({ className, count, children, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'group relative flex h-[34px] items-center gap-1.5 px-3.5 font-sans text-[13px] text-tertiary transition-colors',
        'hover:text-primary',
        'focus-visible:outline-2 focus-visible:outline-border-focus focus-visible:outline-offset-2',
        'data-[state=active]:text-primary data-[state=active]:font-medium',
        "after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full after:content-['']",
        'data-[state=active]:after:bg-interactive-accent',
        className
      )}
      {...props}
    >
      {children}
      {count !== undefined && (
        <>
          {' '}
          <span className="text-[12px] text-tertiary group-data-[state=active]:text-secondary">
            {count}
          </span>
        </>
      )}
    </TabsPrimitive.Trigger>
  )
);
Tab.displayName = 'Tab';

export const TabPanel = TabsPrimitive.Content;
