import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabsList, Tab, TabPanel } from './Tabs';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <Tabs defaultValue="all">
        <TabsList>
          <Tab value="all" count={12}>
            All
          </Tab>
          <Tab value="invoices" count={5}>
            Invoices
          </Tab>
          <Tab value="contracts" count={4}>
            Contracts
          </Tab>
          <Tab value="receipts" count={3}>
            Receipts
          </Tab>
        </TabsList>
        <TabPanel value="all" className="pt-4 font-sans text-[13px] text-secondary">
          Showing all 12 documents.
        </TabPanel>
        <TabPanel value="invoices" className="pt-4 font-sans text-[13px] text-secondary">
          Showing 5 invoices.
        </TabPanel>
        <TabPanel value="contracts" className="pt-4 font-sans text-[13px] text-secondary">
          Showing 4 contracts.
        </TabPanel>
        <TabPanel value="receipts" className="pt-4 font-sans text-[13px] text-secondary">
          Showing 3 receipts.
        </TabPanel>
      </Tabs>
    </div>
  ),
};
