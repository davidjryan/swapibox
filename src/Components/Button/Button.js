import React from 'react';
import './Button.css';
import PropTypes from 'prop-types';

const Button = ({ click, text, givenClass, category, cardInformation }) => {
  let buttonClass;
  console.log(cardInformation);
  if(!cardInformation) {
    buttonClass = `${givenClass} nav-btn`
    return (
      <button onClick={() => click(category)}
              className={buttonClass}>
        {text}
      </button>
    )
  }
  
  buttonClass = `${givenClass}`
  return (
    <button onClick={() => click(category)}
            className={buttonClass}>
      {text}
    </button>
  )
}

// Button.propTypes = {
//   click: PropTypes.func.isRequired,
//   text: PropTypes.string,
//   favNum: PropTypes.number,
//   setClass: PropTypes.string,
//   card: PropTypes.object
// }

export default Button
