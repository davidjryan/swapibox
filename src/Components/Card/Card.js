import React from 'react';
import Button from '../Button/Button'
import './Card.css'
import PropTypes from 'prop-types';

const Card = ({cardData, toggleFavorite}) => {

  const cardFormat = () => {
    // return people format

    // or

    //return planet format

    // or

    //return vehicle format
  }
    return (
      <div className="card">
        <h2 className="card-title">
          Luke Skywalker
          <Button className="favorite-button" />
        </h2>
        <p>Homeworld</p>
        <p>Species</p>
        <p>Language</p>
        <p>Population</p>
      </div>
    )
}

Card.PropTypes = {
  cardData: PropTypes.object.isRequired,
  toggleFavorite: PropTypes.function.isRequired
}

export default Card;
