import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Reports from './Reports';
import shouldLinkToHome from '../../testUtilities/shouldLinkToHome';

test('reports page renders correctly', async () => {
  render(
    <BrowserRouter>
      <Reports />
    </BrowserRouter>,
  );
  expect(await screen.findByText('View Reports')).toBeInTheDocument();
});

test('home link present on reports page', async () => {
  await shouldLinkToHome(Reports);
});
