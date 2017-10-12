import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Button from '../Components/Button/Button';
import peopleMock from '../MockData/peopleMock';

describe('Button', () => {

  it('should create an instance of a button', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<Button
      givenClass='favorite-button nav-btn'
      test=""
      click={mockFunc}
      category={peopleMock[0]}
      cardInformation={peopleMock[0]}
    />);

    expect(wrapper).toMatchSnapshot();
  });
})
