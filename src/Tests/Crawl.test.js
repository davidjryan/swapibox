import React from 'react';
import { shallow } from 'enzyme';
import Crawl from '../Components/Crawl/Crawl';
import filmMock from '../MockData/filmMock';
import dataCleaner from '../helper';

describe('Crawl', () => {

  it('should create an instance of a crawl', () => {
    const wrapper = shallow(<Crawl
      films={dataCleaner(filmMock)}
    />);

    expect(wrapper.find('.crawl-title').length).toEqual(2);
    expect(wrapper.find('.crawl-text').length).toEqual(1);
  });
});
