import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, Box } from '@mui/material';
import { ClassNames } from '@emotion/react';

function Home() {
  const buttonTheme = createTheme({
    typography: {
      button: {
        fontSize: 30,
      },
    },
  });

  const NavigationButtons = () => (
    <div className="Home">
      <header className="App-header">
        <div>
          <Box
            sx={
              {
                display: 'grid',
                minHeight: '85vh',
                gap: 18,
              }
            }
          >
            <ThemeProvider theme={buttonTheme}>
              <Button
                className={ClassNames.mainButton}
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
            </ThemeProvider>
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
