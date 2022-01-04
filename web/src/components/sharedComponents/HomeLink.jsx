import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const HomeLink = () => (
  <Link to="/">
    <HomeIcon color="action" fontSize="large" />
  </Link>
);

export default HomeLink;
