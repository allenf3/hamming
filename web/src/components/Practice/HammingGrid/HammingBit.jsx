import React, { useState } from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function HammingBit({ bit, index }) {
  const [selected, setSelected] = useState(false);
  return (
    <Button
      onClick={() => setSelected(!selected)}
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
};

HammingBit.propTypes = {
  bit: PropTypes.string,
  index: PropTypes.number,
};

export default HammingBit;
