import React from 'react';
import './ButtonContainer.css';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

const ButtonContainer({showPeople, showPlanets, showVehicles, showFavorites, favLength}) => {


  render(
      <div className="btns">
        <Button givenClass={'people-btn'}
          clickEvent={ showPeople } />
        <Button givenClass={'planet-btn'}
          clickEvent={ showPlanets } />
        <Button givenClass={'vehicle-btn'}
          clickEvent={ showVehicles } />
        <Button givenClass={'favorite-btn'}
          clickEvent={ showFavorites } favLength={ favLength }/>
      </div>
     )
}
