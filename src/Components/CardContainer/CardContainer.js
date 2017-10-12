import React from 'react';
import Card from '../Card/Card';
import './CardContainer.css';
import PropTypes from 'prop-types';

const CardContainer = ({cardData, toggleFav}) => {
  const cardFormat = cardData.map( (item, i) => {
    return (
      <Card
        cardInformation={ item }
        toggleFav={ toggleFav }
        key={`${item.Name} - ${i}`} />
    );
  });
  return (
    <div className="card-container">
      { cardFormat }
    </div>
  );
};

CardContainer.propTypes = {
  cardData: PropTypes.array.isRequired,
  toggleFav: PropTypes.func.isRequired
};

export default CardContainer;
