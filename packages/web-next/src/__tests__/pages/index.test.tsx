import { shallow } from 'enzyme';
import React from 'react';
import { RecoilRoot } from 'recoil';

import Home from '../../pages/index';

describe('With Enzyme', () => {
  it('Home contains search form', () => {
    // we need to mock index count
    const app = shallow(
      <RecoilRoot>
        <Home indexCount={0} />
      </RecoilRoot>
    );
    expect(app.find('form')).toBeTruthy();
  });
});
