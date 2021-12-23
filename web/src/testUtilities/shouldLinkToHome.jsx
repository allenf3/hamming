import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const shouldLinkToHome = async (Component) => {
  render(
    <BrowserRouter>
      <Component />
    </BrowserRouter>,
  );
  const homePage = await screen.findByText('Home');
  expect(homePage).toBeInTheDocument();
};

export default shouldLinkToHome;
