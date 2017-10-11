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
})
