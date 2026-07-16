import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  args: { page: 1, pageCount: 2, onPageChange: () => {} },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    function Demo() {
      const [page, setPage] = useState(1);
      return (
        <div style={{ width: 480 }}>
          <Pagination
            page={page}
            pageCount={2}
            onPageChange={setPage}
            itemRange={{ from: page === 1 ? 1 : 11, to: page === 1 ? 10 : 12, total: 12 }}
          />
        </div>
      );
    }
    return <Demo />;
  },
};

export const FirstPage: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <Pagination page={1} pageCount={2} onPageChange={() => {}} itemRange={{ from: 1, to: 10, total: 12 }} />
    </div>
  ),
};

export const LastPage: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <Pagination page={2} pageCount={2} onPageChange={() => {}} itemRange={{ from: 11, to: 12, total: 12 }} />
    </div>
  ),
};
