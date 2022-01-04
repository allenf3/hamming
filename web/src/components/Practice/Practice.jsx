import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Practice.css';
import HomeLink from '../sharedComponents/HomeLink';
import HammingGrid from './HammingGrid/HammingGrid';
import NoErrors from './NoErrors';

const Practice = () => {
  const [code, setCode] = useState([]);
  const [error, setError] = useState(null);
  const [anySelected, setAnySelected] = useState(false);
  const toggleSelected = () => setAnySelected(!anySelected);

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
      <div className="container">
        <HammingGrid code={code} anySelected={anySelected} toggleSelected={toggleSelected} />
        <NoErrors anySelected={anySelected} />
      </div>
      <HomeLink />
    </div>
  );
};

export default Practice;
