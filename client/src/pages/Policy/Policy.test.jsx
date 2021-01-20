import Policy from './Policy';
import { render, screen } from '@testing-library/react';
import { mockUserPolicy } from '../../../../mocks';
import { capitalize } from './Policy';

describe('Policy Page', () => {
  it('Should render policy details', () => {
    render(<Policy userPolicy={mockUserPolicy} />);
    expect(screen.getByText('My Policy')).toBeInTheDocument();
    expect(screen.getByText(/Tesla/)).toBeInTheDocument();
  });

  it('Capitalize function should capitalize word passed to it', () => {
    expect(capitalize('word')).toBe('Word');
  });
});
