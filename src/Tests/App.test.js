import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import filmMock from '../MockData/filmMock';
import peopleMock from '../MockData/peopleMock';
import planetMock from '../MockData/planetMock';
import vehicleMock from '../MockData/vehicleMock';
import mockFullyOperationalData from '../MockData/mockFullyOperationalData';
import App from '../Components/App/App';

describe('App', () => {
  let wrapper;

  afterEach(() => {
    expect(fetchMock.calls().unmatched).toEqual([]);
    fetchMock.restore();
  });

  const pause = () => {
    return new Promise(res => {
      setTimeout(() => {
        res();
      });
    });
  };

  it('Sets state with data after component mounts', async () => {
    fetchMock.get(('https://swapi.co/api/films/'), {
      status: 200,
      body: mockFullyOperationalData[0]
    });
    fetchMock.get(('https://swapi.co/api/people/'), {
      status: 200,
      body: mockFullyOperationalData[1]
    });
    fetchMock.get(('https://swapi.co/api/planets/'), {
      status: 200,
      body: mockFullyOperationalData[2]
    });
    fetchMock.get(('https://swapi.co/api/vehicles/'), {
      status: 200,
      body: mockFullyOperationalData[3]
    });
    wrapper = mount(<App />);
    await pause();
    wrapper.setState({
      fullyOperationalData: mockFullyOperationalData
    });
  });

  // const pause = () => {
  //   return new Promise(res => {
  //     setTimeout( () => {
  //       res()
  //     }, 0)
  //   });
  // };
  //
  // beforeEach( async () => {
  //   fetchMock.get('https://swapi.co/api/films/', {
  //     status: 200,
  //     body: filmMock
  //   })
  //   fetchMock.get('https://swapi.co/api/people/', {
  //     status: 200,
  //     body: peopleMock
  //   })
  //   fetchMock.get('https://swapi.co/api/vehicles/', {
  //     status: 200,
  //     body: planetMock
  //   })
  //   fetchMock.get('https://swapi.co/api/planets/', {
  //     status: 200,
  //     body: vehicleMock
  //   })
  //
  // wrapper = mount(<App />)
  //
  // await pause()
  //
  // })
  // console.log(wrapper.debug());

  // afterEach(() => {
  //    expect(fetchMock.calls().unmatched).toEqual([]);
  //    fetchMock.restore();
  // });

  it('should exist', () => {
    expect(wrapper).toBeDefined();
  });

  // it('should not display its card container components by default', () => {
  //   const wrapper = shallow(<App />)
  //
  //   expect(wrapper.find('CardContainer').length).toEqual(0)
  //
  // });
});
