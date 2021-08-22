import { render, screen } from '@testing-library/react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new EnzymeAdapter()
});

test('renders Hello World', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toBeTruthy();
});
