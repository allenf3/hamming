import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AdminReport from './AdminReport';
import UserReport from './UserReport';

function CustomReport() {
  const { user } = useAuth0();
  const isAdmin = (user[`http://${window.location.hostname}/roles`] || []).includes('Admin');

  return (
    <>
      { isAdmin ? <AdminReport /> : <UserReport /> }
    </>
  );
}

export default CustomReport;
