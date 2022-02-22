import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { Tab, Box, Tabs } from '@mui/material';
import UserReport from './UserReport';

function AdminReport() {
  const [allResults, setAllResults] = useState([]);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(0);
  const [loadingState, setLoadingState] = useState(true);
  const totalAttempts = allResults.length;
  const correctAnswers = allResults.filter((r) => r.correct).length;
  const incorrectAnswers = allResults.filter((r) => !r.correct).length;

  const handleChange = () => {
    if (value === 0) {
      setValue(1);
    } else {
      setValue(0);
    }
  };

  const getDisplayResult = (bit, noErrors) => {
    if (bit) {
      return bit;
    }
    if (noErrors) {
      return 'No Errors';
    }
    return 'Two Errors';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Attempts`);
        setAllResults(data);
      } catch (err) {
        setError(err);
      }
      setLoadingState(false);
    };

    fetchData();
  }, []);

  if (loadingState) {
    return (
      <div>Loading...</div>
    );
  }

  if (error) {
    return (
      <div>There was a problem fetching all the results</div>
    );
  }

  return (
    <Box>
      <Box>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            label="My Results"
            id="admin-report-tab-0"
          />
          <Tab
            label="All Results"
            id="admin-report-tab-1"
          />
        </Tabs>
      </Box>
      <div hidden={value !== 0}>
        {value === 0 && (
        <Box>
          <UserReport />
        </Box>
        )}
      </div>
      <div hidden={value !== 1}>
        <div>
          <h2>All Statistics</h2>
          <TableContainer style={{ width: '250px' }} component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Total Attempts</TableCell>
                  <TableCell>{totalAttempts}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Correct Answers</TableCell>
                  <TableCell>{correctAnswers}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Incorrect Answers</TableCell>
                  <TableCell>{incorrectAnswers}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Correct Percentage</TableCell>
                  <TableCell>
                    {totalAttempts > 0 ? ((correctAnswers / totalAttempts) * 100).toFixed(1) : 'Zero'}
                    %
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div>
          <h3>All History</h3>
          <TableContainer style={{ width: '900px' }} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Attempt</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Answer Given</TableCell>
                  <TableCell>Correct Answer</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Submitted On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allResults.map((row, index) => (
                  <TableRow
                    key={row.attemptId}
                  >
                    <TableCell>
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      {row.userId
                        ? String(row.userId).slice(6)
                        : 'Anonymous' }
                    </TableCell>
                    <TableCell>
                      { getDisplayResult(row.bitSelected, row.noErrorsSelected) }
                    </TableCell>
                    <TableCell>
                      { getDisplayResult(row.actualBit, row.actualNoErrors) }
                    </TableCell>
                    <TableCell>
                      {row.correct
                        ? 'Correct'
                        : 'Incorrect' }
                    </TableCell>
                    <TableCell>
                      {row.submittedOn}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Box>
  );
}

export default AdminReport;
