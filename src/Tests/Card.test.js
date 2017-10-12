import React from 'react';
import { shallow, mount } from 'enzyme';
import Card from '../Components/Card/Card';
import peopleMock from '../MockData/peopleMock';

describe('Card', () => {
  let wrapper;

  it('should create an instance of a card', () => {
    const mockFunc = jest.fn();
    wrapper = shallow(<Card
      cardInformation={peopleMock[0]}
      toggleFav={mockFunc}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should have a button that can be clicked', () => {
    const mockFunc = jest.fn();
    const wrapper = mount(<Card
      cardInformation={peopleMock[0]}
      toggleFav={mockFunc}
    />);
    const button = wrapper.find('button');

    expect(mockFunc).toHaveBeenCalledTimes(0);
    button.simulate('click');
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});
