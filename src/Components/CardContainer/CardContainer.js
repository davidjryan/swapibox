import React from 'react';
import Card from '../Card/Card'
import './CardContainer.css'
import PropTypes from 'prop-types';

const CardContainer = ({cardData, toggleFav}) => {
  const cardFormat = cardData.map( (item) => {
    return(
      <Card cardInformation={ item } toggleFav={ toggleFav } key={`${item.name} - ${Date.now()}`} />
    )
  })
  return (
    <div className="card-container">
      { cardFormat }
    </div>
  )
}

export default CardContainer
