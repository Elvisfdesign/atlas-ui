import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface LoadingStateProps {
  /** Accessible + visible label under the spinner. */
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Atlas Loading State. A centered spinner + label for a page section or
 * card body that's still loading — distinct from Skeleton, which mimics
 * the shape of the content that's coming rather than showing a spinner.
 */
export function LoadingState({ label = 'Loading…', size = 'md', className }: LoadingStateProps) {
  return (
    <div
      role="status"
      className={cn('flex flex-col items-center justify-center gap-3 px-6 py-16 text-center', className)}
    >
      <Loader2 aria-hidden="true" size={size === 'sm' ? 20 : 28} className="animate-spin text-tertiary" />
      <span className="font-sans text-[12.5px] text-secondary">{label}</span>
    </div>
  );
}
