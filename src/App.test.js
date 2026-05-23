import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Taskify landing page hero text', () => {
  render(<App />);
  const heroElement = screen.getByText(/Organize your life/i);
  expect(heroElement).toBeInTheDocument();
});
