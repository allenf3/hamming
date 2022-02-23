/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import DisplayHammingBit from './DisplayHammingBit';
import './Learn.css';

function DisplayHammingGrid({ gridInfo }) {
  return (
    <div className="display-hamming-grid">
      { [...Array(16)].map((element, index) => (
        <DisplayHammingBit
          key={index}
          bit={gridInfo.bits[index]}
          index={index}
          first={index === 0}
          parity={gridInfo.parity.includes(index)}
          count={gridInfo.counted.includes(index)}
        />
      ))}
    </div>
  );
}

DisplayHammingGrid.defaultProps = {
  gridInfo: {
    parity: [],
    counted: [],
  },
};

DisplayHammingGrid.propTypes = {
  gridInfo: PropTypes.shape({
    parity: PropTypes.arrayOf(PropTypes.number),
    counted: PropTypes.arrayOf(PropTypes.number),
    bits: PropTypes.arrayOf(PropTypes.number),
  }),
};

export default DisplayHammingGrid;
