import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HammingBit from './HammingBit';

function HammingGrid({ code }) {
  const [anySelected, setAnySelected] = useState(false);
  const toggleAnySelected = () => setAnySelected(!anySelected);

  return (
    <div className="hammingGrid">
      { code.map((bit, index) => (
        <HammingBit
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          bit={bit}
          index={index}
          toggleAnySelected={toggleAnySelected}
          anySelected={anySelected}
        />
      ))}
    </div>
  );
}

HammingGrid.defaultProps = {
  code: [],
};

HammingGrid.propTypes = {
  code: PropTypes.arrayOf(PropTypes.string),
};

export default HammingGrid;
