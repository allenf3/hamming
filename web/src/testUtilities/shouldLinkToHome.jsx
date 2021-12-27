import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const shouldLinkToHome = async (Component) => {
  render(
    <BrowserRouter>
      <Component />
    </BrowserRouter>,
  );
  expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
};

export default shouldLinkToHome;
