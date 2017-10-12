import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Crawl from '../Components/Crawl/Crawl';
import filmMock from '../MockData/filmMock';

describe('Crawl', () => {

  it('should create an instance of a crawl', () => {
    const mockFunc = jest.fn();
    const wrapper = shallow(<Crawl
      films={filmMock}
    />);

    expect(wrapper.find('.crawl-title').length).toEqual(2);
    expect(wrapper.find('.crawl-text').length).toEqual(1);
  })
})
