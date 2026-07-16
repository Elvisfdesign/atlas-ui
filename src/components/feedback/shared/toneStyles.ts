import { AlertCircle, AlertTriangle, Check, Info } from 'lucide-react';

export type FeedbackTone = 'info' | 'success' | 'warning' | 'danger';

/** Shared tone → background/text classes, reused by Inline Alert, Banner, and Empty State's error/success cases. */
export const TONE_CLASSES: Record<FeedbackTone, string> = {
  info: 'bg-info-bg text-info-text',
  success: 'bg-success-bg text-success-text',
  warning: 'bg-warning-bg text-warning-text',
  danger: 'bg-danger-bg text-danger-text',
};

/** Shared tone → icon, matching the icons already documented in Foundations/Icons (Info, AlertTriangle, Check). */
export const TONE_ICON = {
  info: Info,
  success: Check,
  warning: AlertTriangle,
  danger: AlertCircle,
} as const;

/** Tone → text-only color, for contexts (like Toast) where the icon sits on a neutral surface rather than a tinted one. */
export const TONE_TEXT: Record<FeedbackTone, string> = {
  info: 'text-info-text',
  success: 'text-success-text',
  warning: 'text-warning-text',
  danger: 'text-danger-text',
};
