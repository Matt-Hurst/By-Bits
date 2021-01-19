import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('Should render', () => {
    render(<App />);
    const linkElement = screen.getByTestId('app-container');
    expect(linkElement).toBeInTheDocument();
  });
});
