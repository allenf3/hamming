import React from 'react';
import { render, screen } from '@testing-library/react';
import HammingGrid from './HammingGrid';

const testCodeValid = ['1', '0', '1', '1', '1', '0', '1', '1', '0', '0', '0', '1', '0', '0', '0', '1'];

test('sixteen bits visible in grid', async () => {
  const bitArraySize = 16;
  render(<HammingGrid code={testCodeValid} />);
  expect(await screen.findAllByRole('button')).toHaveLength(bitArraySize);
});
