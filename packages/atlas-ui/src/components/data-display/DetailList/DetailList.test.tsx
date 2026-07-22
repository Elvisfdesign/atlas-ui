import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DetailList } from './DetailList';

describe('DetailList', () => {
  it('renders each label/value pair', () => {
    render(
      <DetailList
        items={[
          { label: 'Vendor Name', value: 'Acme Corporation' },
          { label: 'Invoice Number', value: 'INV-9821' },
        ]}
      />
    );
    expect(screen.getByText('Vendor Name')).toBeInTheDocument();
    expect(screen.getByText('Acme Corporation')).toBeInTheDocument();
    expect(screen.getByText('Invoice Number')).toBeInTheDocument();
    expect(screen.getByText('INV-9821')).toBeInTheDocument();
  });

  it('renders as a definition list for semantic label/value pairing', () => {
    const { container } = render(<DetailList items={[{ label: 'Status', value: 'Active' }]} />);
    expect(container.querySelector('dl')).toBeInTheDocument();
    expect(container.querySelector('dt')).toHaveTextContent('Status');
    expect(container.querySelector('dd')).toHaveTextContent('Active');
  });
});
