import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';
import { Button } from '@/components/actions/Button';

describe('Tooltip', () => {
  it('is hidden until the trigger is hovered or focused', () => {
    render(
      <Tooltip content="98% confidence">
        <Button>Approve</Button>
      </Tooltip>
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('appears on keyboard focus (not just hover) and describes the trigger', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="98% confidence" delayDuration={0}>
        <Button>Approve</Button>
      </Tooltip>
    );
    await user.tab();
    await waitFor(() => expect(screen.getByRole('tooltip')).toHaveTextContent('98% confidence'));
    expect(screen.getByRole('button', { name: 'Approve' })).toHaveAccessibleDescription(
      '98% confidence'
    );
  });

  it('dismisses on Escape', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="98% confidence" delayDuration={0}>
        <Button>Approve</Button>
      </Tooltip>
    );
    await user.tab();
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument());
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });
});
