import React from 'react';
import { render, screen } from '@testing-library/react';
import Reports from './Reports';

test('practice page renders correctly', async () => {
  render(<Reports />);
  expect(await screen.findByText('Practice working with Hamming codes')).toBeInTheDocument();
});
