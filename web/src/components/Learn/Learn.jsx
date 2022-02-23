import React from 'react';
import './Learn.css';
import { Link } from 'react-router-dom';
import HomeLink from '../sharedComponents/HomeLink';
import DisplayHammingGrid from './DisplayHammingGrid';

function Learn() {
  const indexBits = {
    parity: [1, 2, 4, 8],
    counted: [],
    bits: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  };
  const dataBits = {
    parity: [1, 2, 4, 8],
    counted: [],
    bits: [null, null, null, 0, null, 1, 1, 0, null, 1, 0, 0, 1, 0, 0, 1],
  };

  const setBit1 = {
    parity: [1, 2, 4, 8],
    counted: [1, 5, 9, 15],
    bits: [null, 1, null, 0, null, 1, 1, 0, null, 1, 0, 0, 1, 0, 0, 1],
  };

  const setBit2 = {
    parity: [1, 2, 4, 8],
    counted: [2, 6, 15],
    bits: [null, 1, 0, 0, null, 1, 1, 0, null, 1, 0, 0, 1, 0, 0, 1],
  };

  const setBit4 = {
    parity: [1, 2, 4, 8],
    counted: [4, 5, 6, 12, 15],
    bits: [null, 1, 0, 0, 0, 1, 1, 0, null, 1, 0, 0, 1, 0, 0, 1],
  };

  const setBit8 = {
    parity: [1, 2, 4, 8],
    counted: [8, 9, 12, 15],
    bits: [null, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1],
  };

  const setBit0 = {
    parity: [1, 2, 4, 8],
    counted: [0, 1, 5, 6, 8, 9, 12, 15],
    bits: [1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1],
  };

  return (
    <div className="main">
      <HomeLink />
      <h1>Learn about Hamming codes</h1>
      <div>
        <p>
          Let&#39;s say we attend school from September to April and we want to report the number
          of hours we spent studying each month. There are eight months from September to April,
          so we can represent the month in question with three bits of data since there are eight
          possible combinations of three bits:
        </p>
        <pre>000 = September,</pre>
        <pre>001 = October,</pre>
        <pre>010 = November,</pre>
        <pre>011 = December,</pre>
        <pre>100 = January,</pre>
        <pre>101 = February,</pre>
        <pre>110 = March, and </pre>
        <pre>111 = April</pre>
        <p>
          For the part of the message that represents hours spent studying, since we
          can not send decimal numbers with bits directly, we first need to convert
          them from decimal to binary:
        </p>
        <pre>0 in decimal = 0 in binary</pre>
        <pre>1 in decimal = 1 in binary</pre>
        <pre>2 in decimal = 10 in binary</pre>
        <pre>3 in decimal = 11 in binary</pre>
        <pre>4 in decimal = 100 in binary</pre>
        <pre>5 in decimal = 101 in binary</pre>
        <pre>and so on...</pre>
        <p>
          So we inform the recipient that the first three bits of data we send will represent the
          month, and the last 8 bits will represent the hours spent studying &#40;we don&#39;t
          plan to spend more than 255 hours studying in a month&#41;.
        </p>
        <p>
          But there&#39;s a problem: bits are transmitted through physical media and can
          inadvertently be altered due to random phenomena. Therefore a 101 that was sent
          may arrive as 001.
        </p>
        <p>
          In 1950 Richard Hamming published a paper called
          {' '}
          <i>Error detecting and error correcting codes</i>
          {' '}
          that outlined a way for the computer to
          {' '}
          <i><b>correct</b></i>
          {' '}
          one bit that was flipped during transmission or to
          {' '}
          <i><b>detect</b></i>
          {' '}
          two bits that were flipped during transmission. Following is an example of how this works.
        </p>
        <p>
          The grid below represents the bits we are sending in an arrangement that makes it easier
          to visualize how the error correction works. The numbers here do not represent the value
          or data being sent &#40;must be 0 or 1&#41; but indicate the order that they will be
          sent. Bits 3, 5, 6, 7, 9, 10, 11, 12, 13, 14, and 15 are the 11 bits that we want to
          send. Bits 1, 2, 4 and 8 are the error-correcting bits and bit 0 is a parity bit.
        </p>
        <DisplayHammingGrid className="hamming-grid" gridInfo={indexBits} />
        <p>
          Each error-correcting bit &#34;counts&#34; a group of data bits and becomes a 1 if there
          are an odd number of 1 bits and a 0 if there are an even number of 1 bits. Let&#39;s
          replace the index values of the bits with the data we want to send. If we spent 73 hours
          studying in the month of December, we will need to send the code 01101001001, where 011
          represents the month of December and 01001001 is binary for 73. So
          bit 3 will be set to 0, bit 5 will be set to 1, bit 6 will be set to 1, and so on.
        </p>
        <DisplayHammingGrid className="hamming-grid" gridInfo={dataBits} />
        <p>
          Now we need to set the error correcting bits. Bit 1 will be a 0 if the bits directly
          underneath it and the bits in the last column have zero or an even number of 1s. But there
          are three ones, so we will set bit 1 to 1.
        </p>
        <DisplayHammingGrid className="hamming-grid" gridInfo={setBit1} />
      </div>
      <p>
        Bit 2 will be set by the bits directly underneath it and the bits in the last column.
        There are two 1s, bit 2 is set to 0.
      </p>
      <DisplayHammingGrid className="hamming-grid" gridInfo={setBit2} />
      <p>
        Bit 4 will be set by the bits directly to the right of it and the bits on the bottom
        row. There are four 1s, so bit 4 is set to 0.
      </p>
      <DisplayHammingGrid className="hamming-grid" gridInfo={setBit4} />
      <p>
        Bit 8 will be set by the bits directly to the right of it and the bits on the botton
        row. There are three 1s, so bit 8 is set to 1.
      </p>
      <DisplayHammingGrid className="hamming-grid" gridInfo={setBit8} />
      <p>
        Finally, bit 0 is set based on the number of 1s in the rest of the block. There are
        seven 1s, so bit 0 is set to 1.
      </p>
      <DisplayHammingGrid className="hamming-grid" gridInfo={setBit0} />
      <p>
        Now there is enough information in the block to correct a single bit error and to
        detect a two bit error.
        {' '}
        <Link to="/practice">Give it a try!</Link>
      </p>
      <div>
        <p>
          For further information, please see:
        </p>
        <Link to={{ pathname: 'https://google.com' }}>Google</Link>
      </div>
    </div>
  );
}

export default Learn;
