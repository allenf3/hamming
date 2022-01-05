import React from 'react';
import PropTypes from 'prop-types';
import HammingBit from './HammingBit';

function HammingGrid({ code, anySelected, toggleSelected }) {
  return (
    <div className="hammingGrid">
      { code.map((bit, index) => (
        <HammingBit
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          bit={bit}
          index={index}
          toggleSelected={toggleSelected}
          anySelected={anySelected}
        />
      ))}
    </div>
  );
}

HammingGrid.defaultProps = {
  code: [],
  anySelected: false,
  toggleSelected: () => {},
};

HammingGrid.propTypes = {
  code: PropTypes.arrayOf(PropTypes.string),
  anySelected: PropTypes.bool,
  toggleSelected: PropTypes.func,
};

export default HammingGrid;
