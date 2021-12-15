import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Home from './Home';

test('renders navigation buttons', async () => {
  render(<Home />);
  expect(await screen.findByText('Learn')).toBeInTheDocument();
  expect(await screen.findByText('Practice')).toBeInTheDocument();
  expect(await screen.findByText('Reports')).toBeInTheDocument();
});

test('navigates to Learn when clicked', async () => {
  render(<Home />);
  const learn = await screen.findByText('Learn');
  expect(learn).toBeInTheDocument();
  fireEvent.click(learn);
  expect(await screen.findByText('Learn about Hamming codes')).toBeInTheDocument();
});

test('navigates to Practice when clicked', async () => {
  render(<Home />);
  const practice = await screen.findByText('Practice');
  expect(practice).toBeInTheDocument();
  fireEvent.click(practice);
  expect(await screen.findByText('Practice working with Hamming codes')).toBeInTheDocument();
});

test('navigates to Reports when clicked', async () => {
  render(<Home />);
  const reports = await screen.findByText('Reports');
  expect(reports).toBeInTheDocument();
  fireEvent.click(reports);
  expect(await screen.findByText('View Reports')).toBeInTheDocument();
});
