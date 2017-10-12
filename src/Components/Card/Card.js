import React from 'react';
import Button from '../Button/Button'
import './Card.css'
import PropTypes from 'prop-types';

const Card = ({ cardInformation, toggleFavorite }) => {

    return (
      <div className="card">
        <h2 className="card-title">
          {cardInformation.name}
          <Button className="favorite-button" />
        </h2>
      </div>
    )
}

Card.PropTypes = {
  cardData: PropTypes.object.isRequired,
  // toggleFavorite: PropTypes.function.isRequired
}

export default Card;
