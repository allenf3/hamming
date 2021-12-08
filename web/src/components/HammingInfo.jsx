import axios from 'axios';
import React, { useEffect, useState } from 'react';

const HammingInfo = () => {
  const [hammingCode, setHammingCode] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_API}/WeatherForecast`,
        );
        setHammingCode(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>No Hamming Code available</div>;
  }

  return (
    <h2>{hammingCode.code}</h2>
  );
};

export default HammingInfo;
