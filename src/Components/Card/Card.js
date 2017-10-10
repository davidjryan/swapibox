import React from 'react';

const Card = () => {

    return (
      <div className="card">
        <h2 className="card-title">
          Luke Skywalker
          <button className="favorite-button">
            &#x2606;
          </button>
        </h2>
        <p>Homeworld</p>
        <p>Species</p>
        <p>Language</p>
        <p>Population</p>
      </div>
    )
}

export default Card;
