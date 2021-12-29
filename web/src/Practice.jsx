import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './Practice.css';

function Practice() {
  const [code, setCode] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/HammingCodes`);
        setCode(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div>There was an error fetching the codes.</div>
    );
  }

  return (
    <div className="main">
      <h1>Practice working with Hamming codes</h1>
      <div>
        {code.map((bit, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Button key={index} variant="contained" type="button" size="large" className="hammingBit">
            { bit }
          </Button>
        ))}
      </div>
      <Link to="/">Home</Link>
    </div>
  );
}

export default Practice;
