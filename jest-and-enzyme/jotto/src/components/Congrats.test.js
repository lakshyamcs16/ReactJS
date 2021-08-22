import React from 'react';
import { shallow } from 'enzyme';
import Congrats from './Congrats';
import {findByTestAttr, checkProps} from '../test/testUtils';

const defaultProps = { success: false };

const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props};
    return shallow(<Congrats {...setupProps} />);
}

test('renders without errors', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component).toHaveLength(1);
})
test('renders no text when `success` props is false', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.text()).toBe('');
})
test('renders non-empty congrats message', () => {
    const wrapper = setup({ success: true });
    const message = findByTestAttr(wrapper, 'congrats-message');
    expect(message.text().length).not.toBe(0);
})
test('does not throw errors with expected props', () => {
    const expectedProps = { success: false };
    checkProps(Congrats, expectedProps);
})