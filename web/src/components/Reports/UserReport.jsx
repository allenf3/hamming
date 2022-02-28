import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';

function UserReport() {
  const [myResults, setMyResults] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth0();
  const userId = user.sub;
  const totalAttempts = myResults.length;
  const correctAnswers = myResults.filter((r) => r.correct === true).length;
  const incorrectAnswers = myResults.filter((r) => r.correct === false).length;

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
      error.message === 'Request failed with status code 404'
        ? <div>No attempts found. Try out some Hamming code exercices!</div>
        : <div>There was an error retrieving your results</div>
    );
  }

  const getDisplayResult = (bit, noErrors) => {
    if (bit) {
      return bit;
    }
    if (noErrors) {
      return 'No Errors';
    }
    return 'Two Errors';
  };

  return (
    <>
      <div>
        <h2>Your Personal Statistics</h2>
        <TableContainer style={{ width: '250px' }} component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Attempts</TableCell>
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
                <TableCell>Percent Correct</TableCell>
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
        <h3>Attempt History</h3>
        <TableContainer style={{ width: '800px' }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Attempt</TableCell>
                <TableCell>Your Answer</TableCell>
                <TableCell>Correct Answer</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Submitted on</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myResults.map((row, index) => (
                <TableRow
                  key={row.attemptId}
                >
                  <TableCell>
                    {index + 1}
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
    </>
  );
}

export default UserReport;
