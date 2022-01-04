import React, { useState } from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function NoErrors({ anySelected }) {
  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    if (selected) {
      setSelected(false);
    } else if (!anySelected) {
      setSelected(true);
    }
  };

  return (
    <Button
      onClick={handleClick}
      key={1}
      variant="outlined"
      type="button"
      className={`${selected ? 'selected-no-errors' : 'no-errors'} right`}
    >
      { selected ? 'No Errors' : 'If no errors, click here' }
    </Button>
  );
}

NoErrors.defaultProps = {
  anySelected: false,
};

NoErrors.propTypes = {
  anySelected: PropTypes.bool,
};

export default NoErrors;
