import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Practice.css';
import PropTypes from 'prop-types';
import HomeLink from '../sharedComponents/HomeLink';
import HammingGrid from './HammingGrid/HammingGrid';
import NoErrors from './NoErrors';
import TwoErrors from './TwoErrors';
import Submit from './Submit';
import Welcome from '../sharedComponents/Welcome';

const Practice = ({ newExercise }) => {
  const [code, setCode] = useState([]);
  const [exerciseId, setExerciseId] = useState(null);
  const [error, setError] = useState(null);
  const [anySelected, setAnySelected] = useState(false);
  const [noErrorsSelected, setNoErrorsSelected] = useState(false);
  const [twoErrorsSelected, setTwoErrorsSelected] = useState(false);
  const [bitSelected, setBitSelected] = useState(null);
  const toggleAnySelected = (index) => {
    setAnySelected(!anySelected);
    setBitSelected(index);
  };
  const toggleNoErrorsSelected = () => {
    setAnySelected(!anySelected);
    setNoErrorsSelected(!noErrorsSelected);
  };
  const toggleTwoErrorsSelected = () => {
    setAnySelected(!anySelected);
    setTwoErrorsSelected(!twoErrorsSelected);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/HammingCodes`);
        setCode(data.exerciseCodeCharacters);
        setExerciseId(data.id);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div>There was an error fetching the code.</div>
    );
  }

  return (
    <div className="main">
      <HomeLink />
      <div className="container heading">
        <h1>Practice working with Hamming codes</h1>
        <Welcome />
      </div>
      <div className="container together">
        <HammingGrid code={code} anySelected={anySelected} toggleSelected={toggleAnySelected} />
        <div className="right">
          <NoErrors
            toggleSelected={toggleNoErrorsSelected}
            anySelected={anySelected}
            bitSelected={bitSelected}
            noErrorsSelected={noErrorsSelected}
            twoErrorsSelected={twoErrorsSelected}
          />
          <TwoErrors toggleSelected={toggleTwoErrorsSelected} anySelected={anySelected} />
          <Submit
            anySelected={anySelected}
            bitSelected={bitSelected}
            noErrorsSelected={noErrorsSelected}
            twoErrorsSelected={twoErrorsSelected}
            exerciseId={exerciseId}
            newExercise={newExercise}
          />
        </div>
      </div>
    </div>
  );
};

Practice.defaultProps = {
  newExercise: () => {},
};

Practice.propTypes = {
  newExercise: PropTypes.func,
};

export default Practice;
