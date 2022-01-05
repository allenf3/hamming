import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const HomeLink = () => (
  <Link to="/">
    <HomeIcon color="action" fontSize="large" />
    Home
  </Link>
);

export default HomeLink;
