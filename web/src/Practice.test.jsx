import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Practice from './Practice';
import shouldLinkToHome from './testUtilities/shouldLinkToHome';

test('practice page renders correctly', async () => {
  render(
    <BrowserRouter>
      <Practice />
    </BrowserRouter>,
  );
  expect(await screen.findByText('Practice working with Hamming codes')).toBeInTheDocument();
});

test('sixteen bits visible on page', async () => {
  render(
    <BrowserRouter>
      <Practice />
    </BrowserRouter>,
  );
  expect(screen.getAllByRole('button')).toHaveLength(16);
});

test('home link present on practice page', async () => {
  await shouldLinkToHome(Practice);
});
