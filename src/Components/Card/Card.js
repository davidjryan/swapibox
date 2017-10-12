import React from 'react';
import Button from '../Button/Button'
import './Card.css'
import PropTypes from 'prop-types';

const Card = ({ cardInformation, toggleFav }) => {
    const cardKeys = Object.keys(cardInformation)

    const cardDetails = cardKeys.map( (discreteInfo) => {
      if(discreteInfo !== 'name') {
        return(
          <div key={`${discreteInfo} - ${Date.now()}`}>
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
          <Button className="favorite-button" text="&#x2606;" click={toggleFav} category={cardInformation}/>
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
