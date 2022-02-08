import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Learn from './Learn';
import shouldLinkToHome from '../../testUtilities/shouldLinkToHome';

test('learn page renders correctly', async () => {
  render(
    <BrowserRouter>
      <Learn />
    </BrowserRouter>,
  );
  expect(await screen.findByText('Learn about Hamming codes')).toBeInTheDocument();
});

test('home link present on learn page', async () => {
  await shouldLinkToHome(Learn);
});
