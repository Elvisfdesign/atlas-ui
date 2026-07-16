import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

describe('Radio / RadioGroup', () => {
  it('renders as a radiogroup with one radio checked', () => {
    render(
      <RadioGroup label="Assignment" defaultValue="me">
        <Radio value="me" label="Assign to me" />
        <Radio value="team" label="Assign to my team" />
      </RadioGroup>
    );
    expect(screen.getByRole('radiogroup', { name: 'Assignment' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Assign to me' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Assign to my team' })).not.toBeChecked();
  });

  it('selecting one option unchecks the others (native radio semantics via shared name)', async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup label="Assignment" defaultValue="me">
        <Radio value="me" label="Assign to me" />
        <Radio value="team" label="Assign to my team" />
      </RadioGroup>
    );
    await user.click(screen.getByRole('radio', { name: 'Assign to my team' }));
    expect(screen.getByRole('radio', { name: 'Assign to my team' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Assign to me' })).not.toBeChecked();
  });

  it('moves focus between options with arrow keys (native radiogroup keyboard behavior)', async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup label="Assignment" defaultValue="me">
        <Radio value="me" label="Assign to me" />
        <Radio value="team" label="Assign to my team" />
      </RadioGroup>
    );
    await user.tab();
    expect(screen.getByRole('radio', { name: 'Assign to me' })).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('radio', { name: 'Assign to my team' })).toHaveFocus();
    expect(screen.getByRole('radio', { name: 'Assign to my team' })).toBeChecked();
  });

  it('calls onValueChange with the newly selected value', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <RadioGroup label="Assignment" defaultValue="me" onValueChange={onValueChange}>
        <Radio value="me" label="Assign to me" />
        <Radio value="team" label="Assign to my team" />
      </RadioGroup>
    );
    await user.click(screen.getByRole('radio', { name: 'Assign to my team' }));
    expect(onValueChange).toHaveBeenCalledWith('team');
  });

  it('blocks interaction on a disabled option', async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup label="Assignment" defaultValue="me">
        <Radio value="me" label="Assign to me" />
        <Radio value="team" label="Assign to my team" disabled />
      </RadioGroup>
    );
    await user.click(screen.getByRole('radio', { name: 'Assign to my team' }));
    expect(screen.getByRole('radio', { name: 'Assign to my team' })).not.toBeChecked();
  });
});
