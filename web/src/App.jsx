import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Learn from './Learn';
import Practice from './Practice';
import Reports from './Reports';
import Home from './Home';

function App() {
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
