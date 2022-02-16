import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen } from '@testing-library/react';
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
});
