import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const HammingBit = ({ bit, index }) => (
  <Button key={index} variant="contained" type="button" className="hammingBit">
    { bit }
  </Button>
);

HammingBit.defaultProps = {
  bit: '',
  index: 0,
};

HammingBit.propTypes = {
  bit: PropTypes.string,
  index: PropTypes.number,
};

export default HammingBit;
