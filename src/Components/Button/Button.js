import React, { Component } from 'react';
import classnames from 'classnames';
import './Button.css';
import PropTypes from 'prop-types';

class Button extends Component {
  constructor() {
    super();
    this.state = {
      favorite: false
    };
  }

  updateFavState() {
    this.setState({
      favorite: !this.state.favorite
    });
  }

  render() {
    let buttonClass;

    if (!this.props.cardInformation) {
      buttonClass = `${this.props.givenClass} nav-btn`;
      return (
        <button
          onClick={() => this.props.click(this.props.category)}
          className={buttonClass}>
          {this.props.text}
        </button>
      );
    }

    buttonClass = classnames(`${this.props.givenClass}`, {favorite: this.state.favorite});
    return (
      <button
        onClick={() => {
          this.props.click(this.props.category);
          this.updateFavState();
        }}
        className={buttonClass}>
        {this.props.text}
      </button>
    );

  }
}

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
