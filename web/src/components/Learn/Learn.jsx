import React from 'react';
import './Learn.css';
import HomeLink from '../sharedComponents/HomeLink';
import DisplayHammingGrid from './DisplayHammingGrid';

function Learn() {
  const dataBits = {
    parity: [1, 2, 4, 8],
    counted: [0, 1, 2, 4, 8],
  };

  return (
    <div className="main">
      <HomeLink />
      <h1>Learn about Hamming codes</h1>
      <div>
        <p>
          Hamming codes were invented a long time ago by a guy whose name I will allow you to
          guess. They were useful for detecting and correcting errors in transmitted data, until the
          technology was usurped due to the efforts of two other guys named Reed and Solomon
          &#40;again, no hints about the name of the code they invented&#41;
        </p>
        <p>
          Let&#39;s say we wanted to send a block of 11 bits of data. We can add just 5 bits of
          data, for a total of 16 bits, to be able to
          <i><b> correct </b></i>
          one bit that was flipped during transmission or
          <i><b> detect </b></i>
          two bits that were flipped during transmission.
        </p>
        <p>
          The grid below represents the bits we are sending in an arrangement that makes it easier
          to visualize how the error correction works. Bits 3, 5, 6, 7, 9, 10, 11, 12, 13, 14,
          and 15 are the 11 bits that we want to send. Bits 1, 2, 4 and 8
          are the error-correcting bits and bit 0 is a parity bit.
        </p>
        <DisplayHammingGrid className="hamming-grid" gridInfo={dataBits} />
      </div>
      <div>Links go here</div>
    </div>
  );
}

export default Learn;
