/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  render, screen, within, waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminReport from './AdminReport';
import { testAdminExerciseResults } from '../../testUtilities/testData';

const user = {
  sub: 'auth0|927Admin',
};

jest.mock('@auth0/auth0-react', () => ({
  ...jest.requireActual('@auth0/auth0-react'),
  useAuth0: () => ({
    user,
  }),
}));

const testSetup = () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Attempts`).reply(200, testAdminExerciseResults);
};

const testSetupAndRender = () => {
  testSetup();
  render(
    <BrowserRouter>
      <AdminReport />
    </BrowserRouter>,
  );
};

test('admin report page renders correctly', async () => {
  testSetupAndRender();
  expect(await screen.findByText('All Results')).toBeInTheDocument();
  expect(await screen.findByText('My Results')).toBeInTheDocument();
  expect(await screen.findByText('All History')).toBeInTheDocument();
  expect(await screen.findByText('All Statistics')).toBeInTheDocument();
});

test('all history contains correct data', async () => {
  testSetupAndRender();

  const results = [
    ['1', '558', 'Two Errors', 'Two Errors', 'Correct', '2022-01-15-T18:25:43.511Z'],
    ['2', '558', 'No Errors', 'No Errors', 'Correct', '2022-01-29-T19:25:43.511Z'],
    ['3', '558', '14', 'No Errors', 'Incorrect', '2022-01-15-T19:28:43.299Z'],
    ['4', '558', 'Two Errors', 'Two Errors', 'Correct', '2022-02-16-T18:25:43.511Z'],
    ['5', '558', 'Two Errors', 'No Errors', 'Incorrect', '2022-01-17-T18:25:43.511Z'],
    ['6', '558', 'Two Errors', 'Two Errors', 'Correct', '2022-01-18-T18:25:43.511Z'],
    ['7', 'Anonymous', '15', 'No Errors', 'Incorrect', '2022-01-20-T19:28:43.299Z'],
    ['8', 'Anonymous', 'No Errors', 'No Errors', 'Correct', '2022-01-21-T18:25:43.511Z'],
    ['9', 'Anonymous', 'Two Errors', 'Two Errors', 'Correct', '2022-01-22-T18:25:43.511Z'],
    ['10', '927Admin', 'Two Errors', 'Two Errors', 'Correct', '2022-01-23-T18:25:43.511Z'],
    ['11', '927Admin', '15', 'Two Errors', 'Incorrect', '2022-01-24-T19:28:43.299Z'],
    ['12', '927Admin', '13', '13', 'Correct', '2022-01-25-T18:25:43.511Z'],
  ];

  await waitFor(() => expect(screen.getByText('Total Attempts')).toBeInTheDocument());
  const historyResults = screen.getByText('All History').parentNode;
  results.forEach(
    ([attempt, attemptedBy, answerGiven, correctAnswer, result, submittedOn,
    ]) => {
      const row = within(historyResults).getByText(attempt).closest('tr');
      const inRow = within(row);
      expect(inRow.getByText(attempt)).toBeInTheDocument();
      if (result === 'Correct') {
        expect(inRow.getAllByText(answerGiven)).toHaveLength(2);
        expect(inRow.getByText(result)).toBeInTheDocument();
        expect(inRow.getByText(submittedOn)).toBeInTheDocument();
      } else {
        expect(inRow.getByText(attemptedBy)).toBeInTheDocument();
        expect(inRow.getByText(answerGiven)).toBeInTheDocument();
        expect(inRow.getByText(correctAnswer)).toBeInTheDocument();
        expect(inRow.getByText(result)).toBeInTheDocument();
        expect(inRow.getByText(submittedOn)).toBeInTheDocument();
      }
    },
  );
});
