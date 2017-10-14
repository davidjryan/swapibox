import React from 'react';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import filmMock from '../MockData/filmMock';
import vehicleMock from '../MockData/vehicleMock';
import App from '../Components/App/App';
import dataCleaner from '../helper';

describe('App', () => {
  let wrapper;
  let filmMock;

  const pause = () => {
    return new Promise(res => {
      setTimeout(() => {
        res();
      });
    });
  };

  it('Sets state with data after component mounts', async () => {
    fetchMock.get('https://swapi.co/api/films', {
      status: 200,
      body: JSON.stringify(filmMock)
    });
    wrapper = mount(<App />);
    await pause();
    wrapper.setState({
      filmData: dataCleaner(filmMock)
    });
  });

  // it('should not display its card container components by default',
      // () => {
  //   const wrapper = shallow(<App />)
  //
  //   expect(wrapper.find('CardContainer').length).toEqual(0)
  //
  // });
});
