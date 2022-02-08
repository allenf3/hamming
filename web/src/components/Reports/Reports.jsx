import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Welcome from '../sharedComponents/Welcome';
import CustomReport from './CustomReport';
import './Reports.css';

function Reports() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="main">
      <div className="container heading">
        <h1>View Reports</h1>
        <Welcome />
      </div>
      <div className="report-area">
        {isAuthenticated ? <CustomReport /> : 'You must be logged in to view this page'}
      </div>
      <Link to="/">Home</Link>
    </div>
  );
}

export default Reports;
