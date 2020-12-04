import { render, screen } from '@testing-library/react';
import Content from './components/Content';
import SlideDrawer from './components/SlideDrawer';
import TopBar from './components/TopBar';

test('renders top bar', () => {
  render(<TopBar />);
  const buttonElement = screen.getByText(/connect/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders top bar', () => {
  render(<SlideDrawer />);
  const buttonElement = screen.getByText(/validate/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders landing page content', () => {
  render(<Content />);
  const headingElement = screen.getByText(/welcome to cryptocerts/i);
  expect(headingElement).toBeInTheDocument();
});
