import React from 'react';
import './App.css';
import HammingInfo from './components/HammingInfo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Reports
        </a>
        <HammingInfo />
      </header>
    </div>
  );
}

export default App;