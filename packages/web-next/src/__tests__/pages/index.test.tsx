import { shallow } from 'enzyme';
import React from 'react';
import { RecoilRoot } from 'recoil';

import Home from '../../pages/index';

describe('With Enzyme', () => {
  it('Home contains search form', () => {
    const app = shallow(
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    );
    expect(app.find('form')).toBeTruthy();
  });
});
