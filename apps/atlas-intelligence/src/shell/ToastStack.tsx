import { Toast, ToastProvider, ToastViewport } from 'atlas-ui';
import { useReviewStore } from '@/store/useReviewStore';

/** Renders the live toast queue from the review store. One `ToastProvider`
 * for the whole app — mounted once in `AppShell`. */
export function ToastStack() {
  const { toasts, dismissToast } = useReviewStore();

  return (
    <ToastProvider duration={4000}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          tone={toast.tone}
          title={toast.title}
          description={toast.description}
          open
          onOpenChange={(open) => {
            if (!open) dismissToast(toast.id);
          }}
        />
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
