import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders the item-range summary and page buttons', () => {
    render(
      <Pagination
        page={1}
        pageCount={2}
        onPageChange={() => {}}
        itemRange={{ from: 1, to: 10, total: 12 }}
      />
    );
    expect(screen.getByText('Showing 1 to 10 of 12 results')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '1' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: '2' })).not.toHaveAttribute('aria-current');
  });

  it('calls onPageChange when a page number is clicked', async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();
    render(<Pagination page={1} pageCount={2} onPageChange={onPageChange} />);
    await user.click(screen.getByRole('button', { name: '2' }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('disables Previous on the first page and Next on the last page', () => {
    const { rerender } = render(<Pagination page={1} pageCount={2} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeEnabled();

    rerender(<Pagination page={2} pageCount={2} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('calls onPageChange when Next is clicked', async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();
    render(<Pagination page={1} pageCount={2} onPageChange={onPageChange} />);
    await user.click(screen.getByRole('button', { name: 'Next page' }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
