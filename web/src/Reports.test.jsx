import React from 'react';
import { render, screen } from '@testing-library/react';
import Reports from './Reports';

test('reports page renders correctly', async () => {
  render(<Reports />);
  expect(await screen.findByText('View Reports')).toBeInTheDocument();
});
