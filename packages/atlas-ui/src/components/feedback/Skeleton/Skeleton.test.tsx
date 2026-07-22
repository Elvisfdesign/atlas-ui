import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders a hidden pulsing placeholder', () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute('aria-hidden', 'true');
    expect(el.className).toContain('animate-pulse');
  });

  it('applies the given width and height as inline styles', () => {
    const { container } = render(<Skeleton width={120} height={16} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('120px');
    expect(el.style.height).toBe('16px');
  });

  it('applies variant-specific rounding classes', () => {
    const { container } = render(<Skeleton variant="circle" />);
    expect((container.firstChild as HTMLElement).className).toContain('rounded-full');
  });
});
