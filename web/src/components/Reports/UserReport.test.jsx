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

const userId = user.sub;

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
  expect(await screen.findByText('6'));
  expect(await screen.findByText('Attempt History')).toBeInTheDocument();
});
