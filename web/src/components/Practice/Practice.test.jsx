import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Practice from './Practice';
import shouldLinkToHome from '../../testUtilities/shouldLinkToHome';

const testCodeValid = ['1', '0', '1', '1', '1', '0', '1', '1', '0', '0', '0', '1', '0', '0', '0', '1'];

const testSetup = () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/HammingCodes`).reply(200, testCodeValid);
};

const testSetupAndRender = () => {
  testSetup();
  render(
    <BrowserRouter>
      <Practice />
    </BrowserRouter>,
  );
};

test('practice page renders correctly', async () => {
  testSetupAndRender();
  expect(await screen.findByText('Practice working with Hamming codes')).toBeInTheDocument();
});

test('home link present on practice page', async () => {
  testSetup();
  await shouldLinkToHome(Practice);
});

test('click changes bit class', async () => {
  testSetupAndRender();
  const bits = await screen.findAllByText('0');
  const bitToClick = bits[4];
  expect(bitToClick).toBeInTheDocument();
  expect(bitToClick.classList.contains('hamming-bit')).toBe(true);
  fireEvent.click(bitToClick);
  expect(bitToClick.classList.contains('selected-hamming-bit')).toBe(true);
});

test('cannot select multiple bits', async () => {
  testSetupAndRender();
  const bits = await screen.findAllByText('0');
  const firstBit = bits[2];
  const secondBit = bits[5];
  expect(firstBit).toBeInTheDocument();
  expect(secondBit).toBeInTheDocument();
  expect(firstBit.classList.contains('hamming-bit')).toBe(true);
  expect(secondBit.classList.contains('hamming-bit')).toBe(true);
  expect(firstBit.classList.contains('selected-hamming-bit')).toBe(false);
  expect(secondBit.classList.contains('selected-hamming-bit')).toBe(false);
  fireEvent.click(firstBit);
  fireEvent.click(secondBit);
  expect(firstBit.classList.contains('hamming-bit')).toBe(false);
  expect(secondBit.classList.contains('hamming-bit')).toBe(true);
  expect(firstBit.classList.contains('selected-hamming-bit')).toBe(true);
  expect(secondBit.classList.contains('selected-hamming-bit')).toBe(false);
});

test('no errors button is in the document', async () => {
  testSetupAndRender();
  const noErrors = await screen.findByText('If no errors, click here');
  expect(noErrors).toBeInTheDocument();
});

test('bits can not be selected if no errors is selected', async () => {
  testSetupAndRender();
  const noErrors = await screen.findByText('If no errors, click here');
  fireEvent.click(noErrors);
  const noErrorsSelected = await screen.findByText('No Errors');
  expect(noErrorsSelected).toBeInTheDocument();
  const bits = await screen.findAllByText('0');
  const bitToClick = bits[4];
  expect(bitToClick).toBeInTheDocument();
  expect(bitToClick.classList.contains('hamming-bit')).toBe(true);
  fireEvent.click(bitToClick);
  expect(bitToClick.classList.contains('hamming-bit')).toBe(true);
});
