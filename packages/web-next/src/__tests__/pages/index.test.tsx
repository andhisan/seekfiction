import { shallow } from 'enzyme';
import React from 'react';

import Home from '../../pages/index';

describe('With Enzyme', () => {
  it('Home shows "A next-generation anime/manga database" in a <p> tag', () => {
    const app = shallow(<Home />);
    expect(app.find('p').text()).toEqual('A next-generation anime/manga database');
  });
});
