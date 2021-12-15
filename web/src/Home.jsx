import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import './Home.css';
import { Grid } from '@mui/material';

function Home() {
  return (
    <div className="Home">
      <header className="App-header">
        <div>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
          >
            <Button
              variant="contained"
              className="main-nav-button"
              type="button"
            >
              Learn
            </Button>
            <Button
              variant="contained"
              className="main-nav-button"
              type="button"
            >
              Practice
            </Button>
            <Button
              variant="contained"
              className="main-nav-button"
              type="button"
            >
              Reports
            </Button>
          </Grid>
        </div>
      </header>
    </div>
  );
}

export default Home;
