import Counter from './Counter';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new EnzymeAdapter()
});

/**
 * Function to create a shallow wrapper for the Counter component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @param {object} state - Initial state for setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
    const wrapper = shallow(<Counter {...props} />)
    if(state) return wrapper.setState(state);
    return wrapper;
}

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
}
test('renders without errors', () => {
    const wrapper = setup();
    const counterComponent = findByTestAttr(wrapper, 'component-counter');
    expect(counterComponent).toHaveLength(1);
});

test('renders increment button', () => {
    const wrapper = setup();
    const counterDisplay = findByTestAttr(wrapper, 'component-counter-value');
    expect(counterDisplay).toHaveLength(1);
});

test('renders increment button', () => {
    const wrapper = setup();
    const incrementCounter = findByTestAttr(wrapper, 'increment-button');
    expect(incrementCounter).toHaveLength(1);
});

test('renders decrement button', () => {
    const wrapper = setup();
    const decrementButton = findByTestAttr(wrapper, 'decrement-button');
    expect(decrementButton).toHaveLength(1);
});

test('counter starts at 0', () => {
    const wrapper = setup();
    const initialCounterState = wrapper.state('counter');
    expect(initialCounterState).toBe(0);
});

test('clicking button increments the counter', () => {
    const counter = 7;
    const wrapper = setup(null, { counter });
    const incrementCounter = findByTestAttr(wrapper, 'increment-button');
    incrementCounter.simulate('click');
    wrapper.update();

    const counterDisplay = findByTestAttr(wrapper, 'component-counter-value');
    const errorMessage = findByTestAttr(wrapper, "counter-error");
    expect(counterDisplay.text()).toContain(counter + 1);
    expect(errorMessage).toHaveLength(0);
});

test('clicking decrement button decrements the counter', () => {
    const counter = 7;
    const wrapper = setup(null, { counter });
    const decrementButton = findByTestAttr(wrapper, 'decrement-button');
    decrementButton.simulate('click');
    wrapper.update();

    const counterDisplay = findByTestAttr(wrapper, 'component-counter-value');
    const errorMessage = findByTestAttr(wrapper, "counter-error");
    expect(counterDisplay.text()).toContain(counter - 1);
    expect(errorMessage).toHaveLength(0);
});

test('decrement counter below 0' , () => {
    const counter = 0;
    const wrapper = setup(null, { counter });
    const decrementButton = findByTestAttr(wrapper, 'decrement-button');
    decrementButton.simulate('click');
    wrapper.update();

    const counterDisplay = findByTestAttr(wrapper, 'component-counter-value');
    const errorMessage = findByTestAttr(wrapper, "counter-error");
    expect(counterDisplay.text()).toContain(0);
    expect(errorMessage).toHaveLength(1);
});