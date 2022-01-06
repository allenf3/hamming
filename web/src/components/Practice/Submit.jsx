import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function Submit({ anySelected }) {
  const handleSubmit = () => {
    // const response = { bit: null, noError: false, twoErrors: true };
    if (anySelected) {
      return '';
    }
    return '?';
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button
        onClick={handleSubmit}
        variant="contained"
        type="submit"
        className="submit-response"
      >
        Submit Response
      </Button>
    </form>
  );
}

Submit.defaultProps = {
  anySelected: false,
};

Submit.propTypes = {
  anySelected: PropTypes.bool,
};

export default Submit;
