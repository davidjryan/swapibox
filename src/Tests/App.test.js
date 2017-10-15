import React from 'react';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import filmMockApp from '../MockData/filmMockApp';
import filmMock from '../MockData/filmMock';
import vehicleMockApp from '../MockData/vehicleMockApp';
import vehicleMock from '../MockData/vehicleMock';
import App from '../Components/App/App';
import dataCleaner from '../helper';

describe('App', () => {
  let wrapper;
  const cleanedFilmData = dataCleaner(filmMock);
  const cleanedVehicleData = dataCleaner(vehicleMock);

  const pause = () => {
    return new Promise(res => {
      setTimeout(() => {
        res();
      });
    });
  };

  beforeEach( async () => {
    fetchMock.get('https://swapi.co/api/films', {
      status: 200,
      body: filmMockApp
    });
    wrapper = mount(<App />);
    await pause();
    wrapper.setState({
      filmData: cleanedFilmData
    });
  });

  it('Sets state with data after component mounts', async () => {
    expect(wrapper.state().filmData).toEqual(cleanedFilmData);
  });

  it('Loads data and builds cards after user cilck', async () => {
    const vehicleButton = wrapper.find('.vehicles-btn');

    expect(wrapper.find('Card').length).toEqual(0);
    fetchMock.get('https://swapi.co/api/vehicles', {
      status: 200,
      body: vehicleMockApp
    });

    vehicleButton.simulate('click');
    await pause();
    wrapper.setState({
      displayData: 'vehicles',
      vehicleData: cleanedVehicleData
    });

    expect(wrapper.find('Card').length).toEqual(3);

  });

  it('Should allow user to favorite cards and display favorites', async () => {
    const vehicleButton = wrapper.find('.vehicles-btn');
    const favoriteButton = wrapper.find('.favorites-btn');

    expect(wrapper.find('Card').length).toEqual(0);
    fetchMock.get('https://swapi.co/api/vehicles', {
      status: 200,
      body: vehicleMockApp
    });

    vehicleButton.simulate('click');
    await pause();
    wrapper.setState({
      displayData: 'vehicles',
      vehicleData: cleanedVehicleData
    });

    const cardFavButton = wrapper.find('.favorite-button').first();

    expect(wrapper.state().favoriteCards.length).toEqual(0);
    cardFavButton.simulate('click');
    expect(wrapper.state().favoriteCards.length).toEqual(1);

    favoriteButton.simulate('click');
    expect(wrapper.find('Card').length).toEqual(1);
  });
});
