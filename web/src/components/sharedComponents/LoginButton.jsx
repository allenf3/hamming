import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import './AuthButtons.css';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button className="standard" variant="contained" onClick={() => loginWithRedirect()}>
      LogIn
    </Button>
  );
};

export default LoginButton;
