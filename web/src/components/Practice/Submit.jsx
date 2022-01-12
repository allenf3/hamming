import React, { useState } from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import axios from 'axios';

function Submit({
  anySelected, bitSelected, noErrorsSelected, twoErrorsSelected,
}) {
  const [responseResult, setResponseResult] = useState('');
  const [error, setError] = useState('');

  if (error) {
    return (
      <div>There was a problem submiting the response</div>
    );
  }

  if (responseResult) {
    return (
      <div>{ JSON.stringify(responseResult) }</div>
    );
  }

  const handleSubmit = async () => {
    const attempt = { bit: bitSelected, noError: noErrorsSelected, twoErrors: twoErrorsSelected };

    if (anySelected) {
      try {
        await axios.post(`${process.env.REACT_APP_BASE_API}/api/HammingCodes`, attempt)
          .then((result) => {
            setResponseResult(result);
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
};

Submit.propTypes = {
  anySelected: PropTypes.bool,
  bitSelected: PropTypes.number,
  noErrorsSelected: PropTypes.bool,
  twoErrorsSelected: PropTypes.bool,
};

export default Submit;
