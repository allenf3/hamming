import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import './Learn.css';

function DisplayHammingBit({
  bit, index, parity, count,
}) {
  return (
    <Button
      className="display-hamming-bit"
      key={index}
      variant={count ? 'contained' : 'outlined'}
      type="button"
      color={parity ? 'secondary' : 'success'}
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
};

DisplayHammingBit.propTypes = {
  index: PropTypes.number,
  bit: PropTypes.number,
  parity: PropTypes.bool,
  count: PropTypes.bool,
};

export default DisplayHammingBit;
