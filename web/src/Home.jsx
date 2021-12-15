import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import './Home.css';
import { Box } from '@mui/material';

function Home() {
  const NavigationButtons = () => (
    <div className="Home">
      <header className="App-header">
        <div>
          <Box
            sx={
              {
                display: 'grid',
                gridTemplateColumns: 'repeat(3)',
                minHeight: '85vh',
                gap: 18,
              }
            }
          >
            <Button
              variant="contained"
              type="button"
            >
              Learn
            </Button>
            <Button
              variant="contained"
              type="button"
            >
              Practice
            </Button>
            <Button
              variant="contained"
              type="button"
            >
              Reports
            </Button>
          </Box>
        </div>
      </header>
    </div>
  );

  return (
    <div>
      <h1>Hamming Codes</h1>
      <NavigationButtons />
    </div>

  );
}

export default Home;
