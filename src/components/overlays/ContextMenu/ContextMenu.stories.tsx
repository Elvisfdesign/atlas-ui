import type { Meta, StoryObj } from '@storybook/react-vite';
import { Copy, Pencil, Trash2 } from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from './ContextMenu';

const meta = {
  title: 'Overlays/Context Menu',
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-md border border-dashed border-border-default font-sans text-[12.5px] text-tertiary">
        Right-click this area
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem icon={<Pencil size={14} />}>Rename</ContextMenuItem>
        <ContextMenuItem icon={<Copy size={14} />}>Duplicate</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem icon={<Trash2 size={14} />} destructive>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
