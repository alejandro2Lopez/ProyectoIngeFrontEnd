import React from 'react';
import './Switch.css';

const Switch = ({ isOn, handleToggle }) => {
  return (
    <>
      <input
      /*Para poder tener un valor coo tru o false*/ 
       checked={isOn}
       onChange={handleToggle}

        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;