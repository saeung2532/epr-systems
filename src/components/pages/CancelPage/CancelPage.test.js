import React from 'react';
import { shallow } from 'enzyme';
import CancelPage from './CancelPage';

describe('<CancelPage />', () => {
  test('renders', () => {
    const wrapper = shallow(<CancelPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
