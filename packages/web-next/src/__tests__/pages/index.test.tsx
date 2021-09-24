import { shallow } from 'enzyme';
import React from 'react';

import Home from '../../pages/index';

describe('With Enzyme', () => {
  it('Home contains svg tag', () => {
    const app = shallow(<Home />);
    expect(app.find('svg')).toBeTruthy();
  });
});
