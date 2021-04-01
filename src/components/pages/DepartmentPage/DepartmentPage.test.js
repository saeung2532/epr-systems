import React from 'react';
import { shallow } from 'enzyme';
import DepartmentPage from './DepartmentPage';

describe('<DepartmentPage />', () => {
  test('renders', () => {
    const wrapper = shallow(<DepartmentPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
