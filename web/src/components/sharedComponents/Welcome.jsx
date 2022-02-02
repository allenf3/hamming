import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';

function Welcome() {
  const {
    user, isAuthenticated, loginWithRedirect, logout,
  } = useAuth0();

  if (isAuthenticated) {
    return (
      <>
        <div style={{ margin: '10px' }}>
          <span style={{ marginRight: '8px' }}>
            {user.email}
          </span>
          <Button
            className="standard"
            variant="outlined"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Log Out
          </Button>
        </div>
      </>
    );
  }
  return (
    <>
      <div style={{ margin: '10px' }}>
        <Button className="standard" variant="contained" onClick={() => loginWithRedirect()}>
          LogIn
        </Button>
      </div>
    </>
  );
}

export default Welcome;
