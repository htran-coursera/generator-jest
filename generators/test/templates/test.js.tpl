import <%- name %> from '<%- filepath.replace('.jsx', '') %>';

describe('<%- name %>', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <<%- name %> />
    );
  });

  it('renders', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
