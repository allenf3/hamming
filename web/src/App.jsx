import React from 'react';
import { Route, Routes } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import Learn from './Learn';
import Practice from './components/Practice/Practice';
import Reports from './Reports';
import Home from './Home';

function App() {
  const {
    isLoading, error,
  } = useAuth0();

  if (error) {
    return `Oops, ${error.message}`;
  }

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <Routes>
      <Route path="/learn" element={<Learn />} />
      <Route path="/practice" element={<Practice />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
