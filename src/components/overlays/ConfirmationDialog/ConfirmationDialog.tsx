import { Button } from '@/components/actions/Button';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/components/overlays/Modal';

export interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Styles the confirm button as a destructive action (e.g. deleting a workflow). */
  destructive?: boolean;
  onConfirm: () => void;
  /** Disables both buttons and shows the confirm button in its loading label state while an async confirm is in flight. */
  loading?: boolean;
}

/**
 * Atlas Confirmation Dialog. A specific composition of Modal for the
 * confirm/cancel pattern (a destructive delete, a workflow-affecting
 * change) — not a separate visual component, so it can never drift from
 * Modal's chrome.
 */
export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
  onConfirm,
  loading = false,
}: ConfirmationDialogProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent showCloseButton={!loading}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          {description && <ModalDescription>{description}</ModalDescription>}
        </ModalHeader>
        <ModalFooter>
          <Button variant="secondary" size="small" onClick={() => onOpenChange(false)} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={destructive ? 'destructive' : 'primary'}
            size="small"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Please wait…' : confirmLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
