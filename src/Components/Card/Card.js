import React from 'react';
import Button from '../Button/Button';
import './Card.css';
import PropTypes from 'prop-types';

const Card = ({ cardInformation, toggleFav }) => {
  const cardKeys = Object.keys(cardInformation);

  const cardDetails = cardKeys.map( (discreteInfo) => {
    if (discreteInfo !== 'Name' && discreteInfo !== 'favorite') {
      return (
        <div key={`${discreteInfo} - ${cardInformation.Name}`}>
          {/* make this div and it's contents into a component
          so that we can move the card rendering into this and
          apply unique classes to each card as it appends */}

          <p className="card-info-title">{discreteInfo}</p>
          <p className="card-info-body">{cardInformation[discreteInfo]}</p>
        </div>
      );
    }
    return null;
  });

  return (
    <div className="card">
      <h2 className="card-title ">
        {cardInformation.Name}
      </h2>
      <Button
        givenClass={'favorite-button'}
        text="" click={toggleFav}
        category={cardInformation}
        cardInformation={cardInformation}/>
      { cardDetails }
    </div>
  );
};

Card.propTypes = {
  cardInformation: PropTypes.object.isRequired,
  toggleFav: PropTypes.func.isRequired
};

export default Card;
