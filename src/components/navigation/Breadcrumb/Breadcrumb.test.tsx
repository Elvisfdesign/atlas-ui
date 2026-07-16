import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';

describe('Breadcrumb', () => {
  it('renders as a labeled navigation landmark', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem current>Review Queue</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('renders intermediate items as links and the current item as plain text', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem current>Review Queue</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.queryByRole('link', { name: 'Review Queue' })).not.toBeInTheDocument();
    expect(screen.getByText('Review Queue')).toHaveAttribute('aria-current', 'page');
  });

  it('inserts a separator between items but not after the last one', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/review-queue">Review Queue</BreadcrumbItem>
        <BreadcrumbItem current>Invoice_9821.pdf</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getAllByText('/')).toHaveLength(2);
  });
});
