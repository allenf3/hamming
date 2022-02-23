import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import './Learn.css';

const determineColor = (first, parity) => {
  if (first) {
    return 'error';
  }
  if (parity) {
    return 'secondary';
  }
  return 'success';
};
function DisplayHammingBit({
  bit, index, parity, count, first,
}) {
  return (
    <Button
      className="display-hamming-bit"
      key={index}
      variant={count ? 'contained' : 'outlined'}
      type="button"
      color={determineColor(first, parity)}
    >
      { bit }
    </Button>
  );
}

DisplayHammingBit.defaultProps = {
  index: 0,
  bit: 0,
  parity: false,
  count: false,
  first: false,
};

DisplayHammingBit.propTypes = {
  index: PropTypes.number,
  bit: PropTypes.number,
  parity: PropTypes.bool,
  count: PropTypes.bool,
  first: PropTypes.bool,
};

export default DisplayHammingBit;
