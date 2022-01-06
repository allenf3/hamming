import React, { useState } from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function TwoErrors({ anySelected, toggleSelected }) {
  const [twoErrorsSelected, setTwoErrorsSelected] = useState(false);
  const handleClick = () => {
    if (twoErrorsSelected) {
      setTwoErrorsSelected(false);
      toggleSelected();
    } else if (!anySelected) {
      setTwoErrorsSelected(true);
      toggleSelected();
    }
  };

  return (
    <Button
      onClick={handleClick}
      key={1}
      variant="outlined"
      type="button"
      className={`${twoErrorsSelected ? 'selected-two-errors' : 'two-errors'}`}
    >
      { twoErrorsSelected ? 'Two Errors' : 'If two errors, click here' }
    </Button>
  );
}

TwoErrors.defaultProps = {
  anySelected: false,
  toggleSelected: () => {},
};

TwoErrors.propTypes = {
  anySelected: PropTypes.bool,
  toggleSelected: PropTypes.func,
};

export default TwoErrors;
