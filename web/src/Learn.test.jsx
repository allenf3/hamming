import React from 'react';
import { render, screen } from '@testing-library/react';
import Learn from './Learn';

test('learn page renders correctly', async () => {
  render(<Learn />);
  expect(await screen.findByText('Learn about Hamming codes')).toBeInTheDocument();
});
