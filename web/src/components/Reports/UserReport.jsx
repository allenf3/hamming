import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function UserReport() {
  const [myResults, setMyResults] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth0();
  const userId = user.sub;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Attempts/${userId}`);
        setMyResults(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div>There was an error retrieving your results</div>
    );
  }

  return (
    <>
      <div>
        <h2>Your Personal Statistics</h2>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Attempts</TableCell>
                <TableCell>{myResults.length}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <h2>Attempt History</h2>
      </div>
    </>
  );
}

export default UserReport;
