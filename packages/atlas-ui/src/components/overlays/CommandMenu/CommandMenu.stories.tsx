import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileText, Home, Search, Settings, Workflow } from 'lucide-react';
import {
  CommandMenu,
  CommandMenuEmpty,
  CommandMenuGroup,
  CommandMenuInput,
  CommandMenuItem,
  CommandMenuList,
  CommandMenuSeparator,
} from './CommandMenu';

const meta = {
  title: 'Overlays/Command Menu',
  parameters: { layout: 'centered' },
} satisfies Meta<typeof CommandMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo() {
  const [open, setOpen] = useState(true);
  return (
    <CommandMenu open={open} onOpenChange={setOpen} label="Search commands">
      <CommandMenuInput placeholder="Search anything..." />
      <CommandMenuList>
        <CommandMenuEmpty>No results found.</CommandMenuEmpty>
        <CommandMenuGroup heading="Navigate">
          <CommandMenuItem>
            <Home size={14} aria-hidden="true" />
            Go to Dashboard
          </CommandMenuItem>
          <CommandMenuItem>
            <Workflow size={14} aria-hidden="true" />
            Go to Workflows
          </CommandMenuItem>
        </CommandMenuGroup>
        <CommandMenuSeparator />
        <CommandMenuGroup heading="Documents">
          <CommandMenuItem>
            <FileText size={14} aria-hidden="true" />
            Invoice_9821.pdf
          </CommandMenuItem>
          <CommandMenuItem>
            <Search size={14} aria-hidden="true" />
            Search all documents
          </CommandMenuItem>
        </CommandMenuGroup>
        <CommandMenuSeparator />
        <CommandMenuItem>
          <Settings size={14} aria-hidden="true" />
          Open Settings
        </CommandMenuItem>
      </CommandMenuList>
    </CommandMenu>
  );
}

export const Default: Story = {
  render: () => <Demo />,
};
