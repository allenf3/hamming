import React from 'react';
import PropTypes from 'prop-types';
import HammingBit from './HammingBit';

const HammingGrid = ({ code }) => (
  <div className="hammingGrid">
    { code.map((bit, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <HammingBit key={index} bit={bit} index={index} />
    ))}
  </div>
);

HammingGrid.defaultProps = {
  code: [],
};

HammingGrid.propTypes = {
  code: PropTypes.arrayOf(PropTypes.string),
};

export default HammingGrid;
