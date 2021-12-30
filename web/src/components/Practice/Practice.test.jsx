import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Practice from './Practice';
import shouldLinkToHome from '../../testUtilities/shouldLinkToHome';

const testCodeValid = ['1', '0', '1', '1', '1', '0', '1', '1', '0', '0', '0', '1', '0', '0', '0', '1'];

test('practice page renders correctly', async () => {
  render(
    <BrowserRouter>
      <Practice />
    </BrowserRouter>,
  );
  expect(await screen.findByText('Practice working with Hamming codes')).toBeInTheDocument();
});

test('sixteen bits visible on page', async () => {
  const bitArraySize = 16;
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/HammingCodes`).reply(200, testCodeValid);

  render(
    <BrowserRouter>
      <Practice />
    </BrowserRouter>,
  );
  expect(await screen.findAllByRole('button')).toHaveLength(bitArraySize);
});

test('home link present on practice page', async () => {
  await shouldLinkToHome(Practice);
});
