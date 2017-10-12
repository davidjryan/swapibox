import React from 'react';
import './Button.css';
import PropTypes from 'prop-types';

const Button = ({ click, text, givenClass, category }) => {
  let buttonClass = `${givenClass} nav-btn`

  return (
    <button onClick={() => click(category)}
            className={buttonClass}>
      {text}
      {/* {favNum} */}
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
