import React from 'react';
import { shallow } from 'enzyme';
import { HowTo } from '../Components/HowTo';

describe('HowTo', () => {
  it('should match the wrapper', () => {
    let wrapper = shallow(<HowTo />)

    expect(wrapper).toMatchSnapshot();
  })
})