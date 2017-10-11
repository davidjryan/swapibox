import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('App', () => {

  it('should exist', () => {
    const wrapper = shallow(<App />)

    expect(wrapper).toBeDefined()
  });

  it('should not display its card container components by default', () => {
    const wrapper = shallow(<App />)

    expect(wrapper.find('CardContainer').length).toEqual(0)

  });

  it('Should only display one card container at a time.', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('CardContainer').length).toEqual(0)

    wrapper.setState({display: 'people'})
    expect(wrapper.find('CardContainer').length).toEqual(1)

    wrapper.setState({display: 'planets'})
    expect(wrapper.find('CardContainer').length).toEqual(1)


    wrapper.setState({display: 'vehicles'})
    expect(wrapper.find('CardContainer').length).toEqual(1)

  })
})
