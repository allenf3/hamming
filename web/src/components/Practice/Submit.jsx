import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function Submit({ anySelected }) {
  const handleClick = () => {
    if (anySelected) {
      return '';
    }
    return '?';
  };

  return (
    <Button
      onClick={handleClick}
      key={1}
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
};

Submit.propTypes = {
  anySelected: PropTypes.bool,
};

export default Submit;
