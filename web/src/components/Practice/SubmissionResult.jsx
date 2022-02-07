import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import './SubmissionResult.css';

function SubmissionResult({ responseResult, newExercise }) {
  if (responseResult.correct) {
    return (
      <>
        <div className="submissionResult">
          <div className="submissionResultMessage">
            <h2>Correct!</h2>
          </div>
          <div className="newExerciseButton">
            <Button onClick={newExercise} variant="outlined">New Exercise</Button>
          </div>
        </div>
      </>
    );
  }

  if (responseResult.flippedBit) {
    return (
      <div>
        <div>
          <h2 className="submissionResultMessage">{`Incorrect. In this case, bit ${responseResult.flippedBit} was flipped.`}</h2>
        </div>
        <div className="newExerciseButton">
          <Button onClick={newExercise} variant="outlined">New Exercise</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="submissionResultMessage">
        <h2>
          Incorrect. In this case, there were
          { responseResult.noErrors ? ' no ' : ' two ' }
          errors.
        </h2>
      </div>
      <div className="newExerciseButton">
        <Button onClick={newExercise} variant="outlined">New Exercise</Button>
      </div>
    </div>
  );
}

SubmissionResult.defaultProps = {
  responseResult: {},
  newExercise: () => {},
};

SubmissionResult.propTypes = {
  responseResult: PropTypes.shape({
    correct: PropTypes.bool,
    noErrors: PropTypes.bool,
    twoErrors: PropTypes.bool,
    flippedBit: PropTypes.number,
  }),
  newExercise: PropTypes.func,
};

export default SubmissionResult;
