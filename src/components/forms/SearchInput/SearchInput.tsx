import { forwardRef, type InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Atlas Search Input.
 * Source: Atlas Product — the Review Queue topbar search field (320×36,
 * leading Search icon, "Search anything..." placeholder, trailing ⌘K
 * shortcut chip). A distinct component from Input rather than an `icon`
 * prop on it: Search Input's shortcut-chip affordance and `type="search"`
 * semantics aren't something a generic text field should carry.
 */
export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Rendered as a small trailing chip (e.g. "⌘K"). Purely decorative — hidden from assistive tech. */
  shortcut?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, shortcut, placeholder = 'Search anything...', ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-9 items-center gap-2 rounded-md border border-border-default bg-surface px-3',
          'has-[input:hover]:border-border-strong',
          'has-[input:focus-visible]:border-border-focus has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-border-focus/20',
          'has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-60',
          'transition-colors',
          className
        )}
      >
        <Search aria-hidden="true" size={15} className="shrink-0 text-tertiary" />
        <input
          ref={ref}
          type="search"
          role="searchbox"
          placeholder={placeholder}
          className={cn(
            'w-full min-w-0 bg-transparent font-sans text-[13px] text-primary outline-none',
            'placeholder:text-tertiary',
            '[&::-webkit-search-cancel-button]:appearance-none'
          )}
          {...props}
        />
        {shortcut && (
          <span
            aria-hidden="true"
            className="flex shrink-0 items-center rounded-sm border border-border-default bg-surface-subtle px-1.5 py-0.5 font-sans text-[11px] font-medium text-tertiary"
          >
            {shortcut}
          </span>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
