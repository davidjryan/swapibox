import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import CardContainer from '../Components/CardContainer/CardContainer';
import peopleMock from '../MockData/peopleMock';

describe('CardContainer', () => {

  it('should create an instance of a card container', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<CardContainer
      cardData={peopleMock}
      toggleFav={mockFunc}
    />);

    expect(wrapper).toMatchSnapshot();
  })
})
