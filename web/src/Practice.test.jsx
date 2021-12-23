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

test('home link present on practice page', async () => {
  await shouldLinkToHome(Practice);
});
