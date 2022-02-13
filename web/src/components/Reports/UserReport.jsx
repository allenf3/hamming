import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function UserReport() {
  const [myResults, setMyResults] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth0();
  const id = user.sub;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/ExerciseResults${id}`);
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
    <div>{ `You have made ${myResults.length} exercise attempts.` }</div>
  );
}

export default UserReport;
