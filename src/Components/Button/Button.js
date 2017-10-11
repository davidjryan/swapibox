import React from 'react';
import './Button.css';
import PropTypes from 'prop-types';

const Button = ({ click, text, favNum, setClass, card }) => {
  let buttonClass = `${setClass} nav-btn`

  //handle card selection

  return (
    <button onClick={() => click(card)}
            className={buttonClass}>
      {text}
      {favNum}
    </button>
  )
}

Button.propTypes = {
  click: PropTypes.func.isRequired,
  text: PropTypes.string,
  favNum: PropTypes.number,
  setClass: PropTypes.string,
  card: PropTypes.object
}

export default Button
