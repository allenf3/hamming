import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserReport from './UserReport';
import { testUserExerciseResults } from '../../testUtilities/testData';

const user = {
  sub: 'auth0|558',
};

const noAttemptsUser = {
  sub: 'auth0|8345',
};

const userId = user.sub;
const noAttemptsUserId = noAttemptsUser.sub;

jest.mock('@auth0/auth0-react', () => ({
  ...jest.requireActual('@auth0/auth0-react'),
  useAuth0: () => ({
    user,
  }),
}));

const testSetup = () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Attempts/${userId}`).reply(200, testUserExerciseResults);
};

const testSetupAndRender = () => {
  testSetup();
  render(
    <BrowserRouter>
      <UserReport />
    </BrowserRouter>,
  );
};

test('user report page renders correctly', async () => {
  testSetupAndRender();
  expect(await screen.findByText('Your Personal Statistics'));
  expect(await screen.findByText('Attempts'));
  expect(await screen.findByText('6'));
  expect(await screen.findByText('Correct Answers'));
  expect(await screen.findByText('4'));
  expect(await screen.findByText('Incorrect Answers'));
  expect(await screen.findByText('2'));
  expect(await screen.findByText('Percent Correct'));
  expect(await screen.findByText('66.7%'));
  expect(await screen.findByText('Attempt History')).toBeInTheDocument();
});

test('user with zero attempts sees appropriate message', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Attempts/${noAttemptsUserId}`).reply(404, testUserExerciseResults);
  render(
    <BrowserRouter>
      <UserReport />
    </BrowserRouter>,
  );
  expect(await screen.findByText('No attempts found. Try out some Hamming code exercices!')).toBeInTheDocument();
});
