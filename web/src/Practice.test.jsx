import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import Practice from './Practice';

test('practice page renders correctly', async () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Practice />} />
      </Routes>
    </BrowserRouter>,
  );
  expect(await screen.findByText('Practice working with Hamming codes')).toBeInTheDocument();
});

test('can navigate from Practice to Home', async () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Practice />} />
        <Route path="/" element="Main page" />
      </Routes>
    </BrowserRouter>,
  );
  const homePage = await screen.findByText('Main page');
  expect(homePage).toBeInTheDocument();
  fireEvent.click(homePage);
  expect(await screen.findByText('Main page')).toBeInTheDocument();
});
