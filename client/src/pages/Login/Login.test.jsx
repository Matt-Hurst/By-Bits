import Login from './Login';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Login Page', () => {
  it('Should render', () => {
    render(<Login />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
  it('Should capture username when inputed', () => {
    render(<Login />);
    expect(screen.queryByText('username')).not.toBeInTheDocument();
    userEvent.type(screen.getByTestId('username-input'), 'username');
    expect(screen.getByRole('textbox')).toHaveValue('username');
  });
  it('Should capture password when inputed', () => {
    render(<Login />);
    userEvent.type(screen.getByTestId('password-input'), 'password');
    expect(screen.getByTestId('password-input')).toHaveValue('password');
  });
});
