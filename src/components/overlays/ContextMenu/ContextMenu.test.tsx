import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from './ContextMenu';

function setup() {
  render(
    <ContextMenu>
      <ContextMenuTrigger data-testid="area">Right-click area</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Rename</ContextMenuItem>
        <ContextMenuItem destructive>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

describe('ContextMenu', () => {
  it('is closed until the trigger area receives a contextmenu event', () => {
    setup();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens on right-click and shows its items', () => {
    setup();
    fireEvent.contextMenu(screen.getByTestId('area'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Rename' })).toBeInTheDocument();
  });
});
