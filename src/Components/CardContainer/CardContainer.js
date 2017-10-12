import React from 'react';
import Card from '../Card/Card'
import './CardContainer.css'
import PropTypes from 'prop-types';

const CardContainer = ({cardData, toggleFavorite}) => {

  const cardFormat = cardData.map( (item) => {
    <Card cardInformation={ item } />
  })

  return (
    <div className="card-container">
      { cardFormat }
    </div>
  )
}

export default CardContainer
