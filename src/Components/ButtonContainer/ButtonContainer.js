import React from 'react';
import './ButtonContainer.css';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

const ButtonContainer({showPeople, showPlanets, showVehicles, showFavorites, favLength}) => {


  render(
      <div className="btns">
        <Button givenClass={'people-btn'}
          click={ showPeople } />
        <Button givenClass={'planet-btn'}
          click={ showPlanets } />
        <Button givenClass={'vehicle-btn'}
          click={ showVehicles } />
        <Button givenClass={'favorite-btn'}
          click={ showFavorites } favLength={ favLength }/>
      </div>
     )
}
