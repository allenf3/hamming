import React from 'react';
import './App.css';

function Home() {
  return (
    <div className="Home">
      <header className="App-header">
        <div>
          <button
            className="main-nav-button"
            type="button"
          >
            Learn
          </button>
          <button
            className="main-nav-button"
            type="button"
          >
            Practice
          </button>
          <button
            className="main-nav-button"
            type="button"
          >
            Reports
          </button>
        </div>
      </header>
    </div>
  );
}

export default Home;
