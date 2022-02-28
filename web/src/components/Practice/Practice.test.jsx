import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Practice from './Practice';
import shouldLinkToHome from '../../testUtilities/shouldLinkToHome';

const testCodeValid = {
  exerciseCodeCharacters: ['1', '0', '1', '1', '1', '0', '1', '1', '0', '0', '0', '1', '0', '0', '0', '1'],
  id: 15,
};

const correctAnswerResponse = {
  correct: true,
};

const incorrectResponseNoErrors = {
  correct: false,
  noErrors: true,
};

const incorrectResponseTwoErrors = {
  correct: false,
  twoErrors: true,
};

const incorrectResponseBitFlipped = {
  correct: false,
  flippedBit: 4,
};

const testSetup = () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/HammingCodes`).reply(200, testCodeValid);
};

const testRender = () => {
  render(
    <BrowserRouter>
      <Practice />
    </BrowserRouter>,
  );
};

const testSetupAndRender = () => {
  testSetup();
  testRender();
};

test('home link present on practice page', async () => {
  testSetup();
  await shouldLinkToHome(Practice);
});

describe('page is rendered', () => {
  beforeEach(async () => {
    testSetupAndRender();
  });

  test('server error results in error message', async() => {
    const mockApi = new MockAdapter(axios);
    mockApi.onPost(`${process.env.REACT_APP_BASE_API}/api/HammingCodes`).reply(500, testCodeValid);
    fireEvent.click(await screen.findByText('If no errors, click here'));
    fireEvent.click(screen.getByText('Submit Response'));
    expect(await screen.findByText('There was a problem submitting the response.')).toBeInTheDocument();
  });

  test('practice page renders correctly', async () => {
    expect(await screen.findByText('Practice working with Hamming codes')).toBeInTheDocument();
  });

  test('click changes bit class', async () => {
    const bits = await screen.findAllByText('0');
    const bitToClick = bits[4];
    expect(bitToClick).toBeInTheDocument();
    expect(bitToClick.classList.contains('hamming-bit')).toBe(true);
    fireEvent.click(bitToClick);
    expect(bitToClick.classList.contains('selected-hamming-bit')).toBe(true);
  });

  test('cannot select multiple bits', async () => {
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
    const noErrors = await screen.findByText('If no errors, click here');
    expect(noErrors).toBeInTheDocument();
  });

  test('bits can not be selected if no errors is selected', async () => {
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

  test('two errors button is in the document', async () => {
    const twoErrors = await screen.findByText('If two errors, click here');
    expect(twoErrors).toBeInTheDocument();
  });

  test('bits can not be selected if two errors is selected', async () => {
    const twoErrors = await screen.findByText('If two errors, click here');
    fireEvent.click(twoErrors);
    const twoErrorsSelected = await screen.findByText('Two Errors');
    expect(twoErrorsSelected).toBeInTheDocument();
    const bits = await screen.findAllByText('0');
    const bitToClick = bits[4];
    expect(bitToClick).toBeInTheDocument();
    expect(bitToClick.classList.contains('hamming-bit')).toBe(true);
    fireEvent.click(bitToClick);
    expect(bitToClick.classList.contains('hamming-bit')).toBe(true);
  });

  test('two errors button can not be selected if bit is already selected', async () => {
    const bits = await screen.findAllByText('0');
    const bitToClick = bits[4];
    expect(bitToClick).toBeInTheDocument();
    fireEvent.click(bitToClick);
    const twoErrors = await screen.findByText('If two errors, click here');
    expect(twoErrors.classList.contains('two-errors')).toBe(true);
    fireEvent.click(twoErrors);
    expect(twoErrors.classList.contains('two-errors')).toBe(true);
  });

  test('two errors button can not be selected if no errors button is already selected', async () => {
    const noErrors = await screen.findByText('If no errors, click here');
    expect(noErrors).toBeInTheDocument();
    fireEvent.click(noErrors);
    const twoErrors = await screen.findByText('If two errors, click here');
    expect(twoErrors.classList.contains('two-errors')).toBe(true);
    fireEvent.click(twoErrors);
    expect(twoErrors.classList.contains('two-errors')).toBe(true);
  });

  test('no errors button can not be selected if two errors button is already selected', async () => {
    const twoErrors = await screen.findByText('If two errors, click here');
    expect(twoErrors).toBeInTheDocument();
    fireEvent.click(twoErrors);
    const noErrors = await screen.findByText('If no errors, click here');
    expect(noErrors).toBeInTheDocument();
    fireEvent.click(noErrors);
    expect(noErrors.classList.contains('no-errors')).toBe(true);
    expect(noErrors.classList.contains('selected-no-errors')).toBe(false);
  });

  test('submit button on the practice page', async () => {
    const submitTest = await screen.findByText('Submit Response');
    expect(submitTest).toBeInTheDocument();
  });

  test('correct answer displays correct to user', async () => {
    const mockApi = new MockAdapter(axios);
    mockApi.onPost(`${process.env.REACT_APP_BASE_API}/api/HammingCodes`).reply(200, correctAnswerResponse);
    fireEvent.click(await screen.findByText('If no errors, click here'));
    fireEvent.click(screen.getByText('Submit Response'));
    expect(await screen.findByText('Correct!')).toBeInTheDocument();
  });

  test('incorrect no errors displays correct response', async () => {
    const mockApi = new MockAdapter(axios);
    mockApi.onPost(`${process.env.REACT_APP_BASE_API}/api/HammingCodes`).reply(200, incorrectResponseNoErrors);
    fireEvent.click(await screen.findByText('If no errors, click here'));
    fireEvent.click(screen.getByText('Submit Response'));
    expect(await screen.findByText('Incorrect. In this case, there were no errors.')).toBeInTheDocument();
  });

  test('incorrect two errors displays correct response', async () => {
    const mockApi = new MockAdapter(axios);
    mockApi.onPost(`${process.env.REACT_APP_BASE_API}/api/HammingCodes`).reply(200, incorrectResponseTwoErrors);
    fireEvent.click(await screen.findByText('If no errors, click here'));
    fireEvent.click(screen.getByText('Submit Response'));
    expect(await screen.findByText('Incorrect. In this case, there were two errors.')).toBeInTheDocument();
  });

  test('incorrect two errors displays correct response', async () => {
    const mockApi = new MockAdapter(axios);
    mockApi.onPost(`${process.env.REACT_APP_BASE_API}/api/HammingCodes`).reply(200, incorrectResponseBitFlipped);
    fireEvent.click(await screen.findByText('If no errors, click here'));
    fireEvent.click(screen.getByText('Submit Response'));
    expect(await screen.findByText('Incorrect. In this case, bit 4 was flipped.')).toBeInTheDocument();
  });
});
