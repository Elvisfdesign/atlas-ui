import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Sidebar, SidebarSection } from './Sidebar';
import { SidebarItem } from './SidebarItem';

describe('Sidebar', () => {
  it('renders as a labeled navigation landmark', () => {
    render(
      <Sidebar>
        <SidebarSection>
          <SidebarItem>Home</SidebarItem>
        </SidebarSection>
      </Sidebar>
    );
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
  });

  it('renders every item passed as children', () => {
    render(
      <Sidebar>
        <SidebarSection>
          <SidebarItem>Home</SidebarItem>
          <SidebarItem active count={12}>
            Review Queue
          </SidebarItem>
        </SidebarSection>
      </Sidebar>
    );
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Review Queue 12' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });
});
