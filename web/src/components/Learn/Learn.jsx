import React from 'react';
import './Learn.css';
import HomeLink from '../sharedComponents/HomeLink';

function Learn() {
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
      </div>
      <div>Example goes here</div>
      <div>Links go here</div>
    </div>
  );
}

export default Learn;
