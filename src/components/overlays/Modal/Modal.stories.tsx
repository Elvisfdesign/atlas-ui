import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/actions/Button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from './Modal';

const meta = {
  title: 'Overlays/Modal',
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Modal defaultOpen>
      <ModalTrigger asChild>
        <Button variant="secondary">Open modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Rename workflow</ModalTitle>
          <ModalDescription>Choose a new name for this workflow.</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <input
            defaultValue="Invoice Approval"
            className="h-9 w-full rounded-md border border-border-default bg-surface px-3 font-sans text-[13px] text-primary outline-none focus-visible:border-border-focus"
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" size="small">
            Cancel
          </Button>
          <Button variant="primary" size="small">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const Closed: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="secondary">Open modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Rename workflow</ModalTitle>
          <ModalDescription>Choose a new name for this workflow.</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="secondary" size="small">
            Cancel
          </Button>
          <Button variant="primary" size="small">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};
