import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from './Drawer';

function setup() {
  render(
    <Drawer>
      <DrawerTrigger>Open drawer</DrawerTrigger>
      <DrawerContent side="right">
        <DrawerTitle>Document details</DrawerTitle>
      </DrawerContent>
    </Drawer>
  );
}

describe('Drawer', () => {
  it('is closed until the trigger is activated', () => {
    setup();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens on trigger click', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole('button', { name: 'Open drawer' }));
    expect(screen.getByRole('dialog', { name: 'Document details' })).toBeInTheDocument();
  });

  it('renders a labeled close button', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole('button', { name: 'Open drawer' }));
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });
});
