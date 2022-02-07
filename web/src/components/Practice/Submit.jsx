import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import SubmissionResult from './SubmissionResult';

function Submit({
  anySelected, bitSelected, noErrorsSelected,
  twoErrorsSelected, exerciseId, newExercise,
}) {
  const [responseResult, setResponseResult] = useState(null);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useAuth0();

  if (error) {
    return (
      <div>There was a problem submiting the response</div>
    );
  }

  if (responseResult) {
    return (
      <div>
        <SubmissionResult
          newExercise={newExercise}
          responseResult={responseResult}
        />
      </div>
    );
  }

  const handleSubmit = async () => {
    const userId = (isAuthenticated ? user.sub : null);
    const attempt = {
      bitSelected, noErrorsSelected, twoErrorsSelected, exerciseId, userId,
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
  newExercise: () => {},
};

Submit.propTypes = {
  anySelected: PropTypes.bool,
  bitSelected: PropTypes.number,
  noErrorsSelected: PropTypes.bool,
  twoErrorsSelected: PropTypes.bool,
  exerciseId: PropTypes.number,
  newExercise: PropTypes.func,
};

export default Submit;
