import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/actions/Button';
import { DetailList } from '@/components/data-display/DetailList';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './Drawer';

const meta = {
  title: 'Overlays/Drawer',
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {
  render: () => (
    <Drawer defaultOpen>
      <DrawerTrigger asChild>
        <Button variant="secondary">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent side="right">
        <DrawerHeader>
          <DrawerTitle>Invoice_9821.pdf</DrawerTitle>
          <DrawerDescription>Document details</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <DetailList
            items={[
              { label: 'Vendor Name', value: 'Acme Corporation' },
              { label: 'Invoice Number', value: 'INV-9821' },
              { label: 'Total Amount', value: '$12,450.00' },
            ]}
          />
        </DrawerBody>
        <DrawerFooter>
          <Button variant="secondary" size="small">
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Left: Story = {
  render: () => (
    <Drawer defaultOpen>
      <DrawerTrigger asChild>
        <Button variant="secondary">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent side="left">
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <p className="font-sans text-[12.5px] text-secondary">Filter controls go here.</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
};
