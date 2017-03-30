import React from 'react';

import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import <%- name %> from '<%- filepath.replace('.jsx', '') %>';

describe('<%- name %>', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <<%- name %> />
    );
  });

  it('renders properly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
