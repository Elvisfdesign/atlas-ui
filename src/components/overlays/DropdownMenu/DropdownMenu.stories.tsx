import type { Meta, StoryObj } from '@storybook/react-vite';
import { Copy, Pencil, Trash2 } from 'lucide-react';
import { IconButton } from '@/components/actions/IconButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './DropdownMenu';

const meta = {
  title: 'Overlays/Dropdown Menu',
  parameters: { layout: 'centered' },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton icon={<Trash2 />} aria-label="More options" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem icon={<Pencil size={14} />}>Rename</DropdownMenuItem>
        <DropdownMenuItem icon={<Copy size={14} />} shortcut="⌘D">
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<Trash2 size={14} />} destructive>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithLabelAndDisabledItem: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton icon={<Trash2 />} aria-label="More options" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Workflow actions</DropdownMenuLabel>
        <DropdownMenuItem>Run now</DropdownMenuItem>
        <DropdownMenuItem disabled>Pause (already paused)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
