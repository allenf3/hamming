import React, { useState } from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function HammingBit({
  bit, index, anySelected, toggleSelected,
}) {
  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    if (selected) {
      setSelected(!selected);
      toggleSelected();
    } else if (!anySelected) {
      setSelected(!selected);
      toggleSelected();
    }
  };

  return (
    <Button
      onClick={handleClick}
      key={index}
      variant="contained"
      type="button"
      className={selected ? 'selected-hamming-bit' : 'hamming-bit'}
    >
      { bit }
    </Button>
  );
}

HammingBit.defaultProps = {
  bit: '',
  index: 0,
  anySelected: false,
  toggleSelected: {},
};

HammingBit.propTypes = {
  bit: PropTypes.string,
  index: PropTypes.number,
  anySelected: PropTypes.bool,
  toggleSelected: PropTypes.func,
};

export default HammingBit;
