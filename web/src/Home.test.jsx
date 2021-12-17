import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import Home from './Home';

test('renders navigation buttons', async () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>,
  );
  expect(await screen.findByText('Learn')).toBeInTheDocument();
  expect(await screen.findByText('Practice')).toBeInTheDocument();
  expect(await screen.findByText('Reports')).toBeInTheDocument();
});

test('navigates to Learn when clicked', async () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/learn" element="Learn about Hamming codes" />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>,
  );
  const learn = await screen.findByText('Learn');
  expect(learn).toBeInTheDocument();
  fireEvent.click(learn);
  expect(await screen.findByText('Learn about Hamming codes')).toBeInTheDocument();
});

test('navigates to Practice when clicked', async () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/practice" element="Practice working with Hamming codes" />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>,
  );
  const practice = await screen.findByText('Practice');
  expect(practice).toBeInTheDocument();
  fireEvent.click(practice);
  expect(await screen.findByText('Practice working with Hamming codes')).toBeInTheDocument();
});

test('navigates to Reports when clicked', async () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/reports" element="View Reports" />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>,
  );
  const reports = await screen.findByText('Reports');
  expect(reports).toBeInTheDocument();
  fireEvent.click(reports);
  expect(await screen.findByText('View Reports')).toBeInTheDocument();
});
