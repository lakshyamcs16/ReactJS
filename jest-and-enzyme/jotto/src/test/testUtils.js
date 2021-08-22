import checkPropTypes from 'check-prop-types';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { middlewares } from '../configureStore';

export const storeFactory = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
}

export const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
}

export const checkProps = (Component, conformingProps) => {
    const propError = checkPropTypes(
        Component.propTypes,
        conformingProps,
        'prop',
        Component.name
    );
    expect(propError).toBeUndefined();
}