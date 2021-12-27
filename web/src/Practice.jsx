import React from 'react';
import { Link } from 'react-router-dom';

const HammingBit = () => (
  <button type="button" className="hammingBit">
    1
  </button>
);

function Practice() {
  return (
    <div>
      <h1>Practice working with Hamming codes</h1>
      <HammingBit />
      <HammingBit />
      <HammingBit />
      <HammingBit />
      <HammingBit />
      <HammingBit />
      <HammingBit />
      <HammingBit />
      <HammingBit />
      <HammingBit />
      <HammingBit />
      <HammingBit />
      <HammingBit />
      <HammingBit />
      <HammingBit />
      <HammingBit />
      <Link to="/">Home</Link>
    </div>
  );
}

export default Practice;
