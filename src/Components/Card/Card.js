import React from 'react';
import Button from '../Button/Button'
import './Card.css'
import PropTypes from 'prop-types';

const Card = ({ cardInformation, toggleFavorite }) => {

    const cardKeys = Object.keys(cardInformation)

    const cardDetails = cardKeys.map( (discreteInfo) => {
      if(discreteInfo !== 'name') {
        return(
          <div>
            <p className="card-info-title">{discreteInfo}</p>
            <p className="card-info-body">{cardInformation[discreteInfo]}</p>
          </div>
        );
      }
    })

    return (
      <div className="card">
        <h2 className="card-title">
          {cardInformation.name}
          <Button className="favorite-button" />
        </h2>
        { cardDetails }
      </div>
    )
}

Card.PropTypes = {
  cardData: PropTypes.object.isRequired,
  // toggleFavorite: PropTypes.function.isRequired
}

export default Card;
