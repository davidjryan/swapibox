import React from 'react';
import './Button.css';
import PropTypes from 'prop-types';

const Button = ({ click, text, givenClass, category, cardInformation }) => {
  let buttonClass;
  if (!cardInformation) {
    buttonClass = `${givenClass} nav-btn`;
    return (
      <button
        onClick={() => click(category)}
        className={buttonClass}>
        {text}
      </button>
    );
  }

  buttonClass = `${givenClass}`;
  return (
    <button
      onClick={() => click(category)}
      className={buttonClass}>
      {text}
    </button>
  );
};

Button.propTypes = {
  click: PropTypes.func.isRequired,
  text: PropTypes.string,
  setClass: PropTypes.string,
  givenClass: PropTypes.string,
  category: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  cardInformation: PropTypes.object
};

export default Button;
