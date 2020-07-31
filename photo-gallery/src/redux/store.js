import {createStore, applyMiddleware} from 'redux';
import root_reducer from './root.reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';


const store = createStore(root_reducer, applyMiddleware(logger, thunk));

export default store;