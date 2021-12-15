import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders navigation buttons', async() => {
  render(<Home />);
  expect(await screen.findByText('Learn')).toBeInTheDocument();
  expect(await screen.findByText('Practice')).toBeInTheDocument();
  expect(await screen.findByText('Reports')).toBeInTheDocument();
});
