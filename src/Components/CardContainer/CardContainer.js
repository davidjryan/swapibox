import React from 'react';
import Card from '../Card/Card'
import './CardContainer.css'
import PropTypes from 'prop-types';

const CardContainer = ({cardData, toggleFavorite}) => {
  const cardFormat = () => {
    <div className="card-container">
      <Card />
    </div>
  }

  return (
    <div className="card-container">
      { cardFormat }
    </div>
  )
}

export default CardContainer
