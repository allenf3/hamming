import React, { useState } from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function NoErrors({ anySelected, toggleSelected }) {
  const [noErrorsSelected, setNoErrorsSelected] = useState(false);
  const handleClick = () => {
    if (noErrorsSelected) {
      setNoErrorsSelected(false);
      toggleSelected();
    } else if (!anySelected) {
      setNoErrorsSelected(true);
      toggleSelected();
    }
  };

  return (
    <Button
      onClick={handleClick}
      key={1}
      variant="outlined"
      type="button"
      className={`${noErrorsSelected ? 'selected-no-errors' : 'no-errors'}`}
    >
      { noErrorsSelected ? 'No Errors' : 'If no errors, click here' }
    </Button>
  );
}

NoErrors.defaultProps = {
  anySelected: false,
  toggleSelected: () => {},
};

NoErrors.propTypes = {
  anySelected: PropTypes.bool,
  toggleSelected: PropTypes.func,
};

export default NoErrors;
