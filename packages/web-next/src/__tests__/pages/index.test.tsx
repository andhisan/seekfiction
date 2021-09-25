import { shallow } from 'enzyme';
import React from 'react';

import Home from '../../pages/index';

describe('With Enzyme', () => {
  it('Home contains search form', () => {
    const app = shallow(<Home />);
    expect(app.find('form')).toBeTruthy();
  });
});
