import React, { useState } from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function TwoErrors({ anySelected, toggleSelected }) {
  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    if (selected) {
      setSelected(false);
      toggleSelected();
    } else if (!anySelected) {
      setSelected(true);
      toggleSelected();
    }
  };

  return (
    <Button
      onClick={handleClick}
      key={1}
      variant="outlined"
      type="button"
      className={`${selected ? 'selected-two-errors' : 'two-errors'}`}
    >
      { selected ? 'Two Errors' : 'If two errors, click here' }
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
