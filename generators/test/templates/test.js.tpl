/* global expect */
const React = require('react');

const {shallow} = require('enzyme');
const toJson = require('enzyme-to-json').default;

const <%- name %> = require('<%- filepath.replace('.jsx', '') %>');

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
