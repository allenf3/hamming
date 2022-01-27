/* eslint-disable no-console */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import axios from 'axios';

function Submit({
  anySelected, bitSelected, noErrorsSelected, twoErrorsSelected, exerciseId,
}) {
  const [responseResult, setResponseResult] = useState('');
  const [error, setError] = useState(null);

  if (error) {
    return (
      <div>There was a problem submiting the response</div>
    );
  }

  if (responseResult.correct) {
    return (
      <div>Correct!</div>
    );
  }

  if (!responseResult.correct) {
    if (responseResult.flippedBit) {
      return (
        <div>{`Incorrect. In this case, bit ${responseResult.flippedBit} was flipped.`}</div>
      );
    }
    if (responseResult.noErrors) {
      return (
        <div>Incorrect. In this case, there were no errors.</div>
      );
    }
    if (responseResult.twoErrors) {
      return (
        <div>Incorrect. In this case, there were two errors.</div>
      );
    }
  }

  const handleSubmit = async () => {
    const attempt = {
      bitSelected, noErrorsSelected, twoErrorsSelected, exerciseId,
    };
    if (anySelected) {
      try {
        await axios.post(`${process.env.REACT_APP_BASE_API}/api/HammingCodes`, attempt,
          { headers: { 'Content-Type': 'application/json' } })
          .then((result) => {
            setResponseResult(result.data);
          });
      } catch (err) {
        setError(err);
      }
    }
  };

  return (
    <Button
      onClick={handleSubmit}
      variant="contained"
      type="submit"
      className="submit-response"
    >
      Submit Response
    </Button>
  );
}

Submit.defaultProps = {
  anySelected: false,
  bitSelected: null,
  noErrorsSelected: false,
  twoErrorsSelected: false,
  exerciseId: null,
};

Submit.propTypes = {
  anySelected: PropTypes.bool,
  bitSelected: PropTypes.number,
  noErrorsSelected: PropTypes.bool,
  twoErrorsSelected: PropTypes.bool,
  exerciseId: PropTypes.number,
};

export default Submit;
