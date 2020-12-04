import { render, screen } from '@testing-library/react';
import App from './App';
import Home from './components/Home';
import ValidatePage from './components/ValidatePage';
import TopBar from './components/TopBar';
import InstitutionsPage from './components/InstitutionsPage';

test('renders top bar', () => {
  render(<TopBar />);
  const buttonElement = screen.getByText(/connect/i);
  expect(buttonElement).toBeInTheDocument();
});

// test('renders top bar', () => {
//   render(<App />);
//   const buttonElement = screen.getByText(/validate/i);
//   expect(buttonElement).toBeInTheDocument();
// });

test('renders landing page content', () => {
  render(<Home />);
  const headingElement = screen.getByText(/welcome to cryptocerts/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders landing page content', () => {
  render(<InstitutionsPage />);
  const headingElement = screen.getByText(/institutions/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders landing page content', () => {
  render(<ValidatePage />);
  const headingElement = screen.getByText(/validate a document/i);
  expect(headingElement).toBeInTheDocument();
});
