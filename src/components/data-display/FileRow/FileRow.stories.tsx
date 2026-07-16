import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileText, Image, FileSpreadsheet } from 'lucide-react';
import { FileRow } from './FileRow';

const meta = {
  title: 'Data Display/File Row',
  component: FileRow,
  parameters: { layout: 'centered' },
  args: { fileName: 'Invoice_2024_1847.pdf' },
} satisfies Meta<typeof FileRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithMeta: Story = { args: { meta: '2.4 MB · 4 pages' } };

export const CustomIcon: Story = {
  args: { icon: <FileText size={14} />, meta: 'Contract_Vendor_A.pdf' },
};

export const List: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 240 }}>
      <FileRow fileName="Invoice_2024_1847.pdf" icon={<FileText size={14} />} meta="2.4 MB" />
      <FileRow fileName="Scan_0472.png" icon={<Image size={14} />} meta="820 KB" />
      <FileRow fileName="Q3_Summary.xlsx" icon={<FileSpreadsheet size={14} />} meta="118 KB" />
    </div>
  ),
};
