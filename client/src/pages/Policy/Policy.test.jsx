import Policy from './Policy';
import { render, screen } from '@testing-library/react';
import { mockUserPolicy } from '../../mocks';

describe('Policy Page', () => {
  it('Should render policy details', () => {
    render(<Policy userPolicy={mockUserPolicy} />);
    expect(screen.getByText('My Policy')).toBeInTheDocument();
    expect(screen.getByText(/Tesla/)).toBeInTheDocument();
  });
});
