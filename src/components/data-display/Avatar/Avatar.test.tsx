import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('exposes the full name as its accessible name', () => {
    render(<Avatar name="Sophia Carter" />);
    expect(screen.getByRole('img', { name: 'Sophia Carter' })).toBeInTheDocument();
  });

  it('derives two-letter initials from a full name', () => {
    render(<Avatar name="Sophia Carter" />);
    expect(screen.getByText('SC')).toBeInTheDocument();
  });

  it('honors an explicit initials override', () => {
    render(<Avatar name="Sophia Carter" initials="SVC" />);
    expect(screen.getByText('SVC')).toBeInTheDocument();
  });

  it('picks the same color for the same name every render', () => {
    const { unmount, container } = render(<Avatar name="Sophia Carter" />);
    const first = container.querySelector('span[class*="bg-avatar"]')?.className;
    unmount();
    const { container: container2 } = render(<Avatar name="Sophia Carter" />);
    const second = container2.querySelector('span[class*="bg-avatar"]')?.className;
    expect(first).toBe(second);
  });

  it('falls back to initials if the photo fails to load', () => {
    render(<Avatar name="Sophia Carter" src="https://broken.example/x.jpg" />);
    const img = screen.getByRole('img', { name: 'Sophia Carter' }).querySelector('img')!;
    fireEvent.error(img);
    expect(screen.getByText('SC')).toBeInTheDocument();
  });
});
