import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';

const meta = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  args: {
    children: (
      <>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem current>Review Queue</BreadcrumbItem>
      </>
    ),
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem current>Review Queue</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const ThreeLevels: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/review-queue">Review Queue</BreadcrumbItem>
      <BreadcrumbItem current>Invoice_9821.pdf</BreadcrumbItem>
    </Breadcrumb>
  ),
};
