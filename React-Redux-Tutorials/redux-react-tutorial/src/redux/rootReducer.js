import {combineReducers} from 'redux';
import cakeReducer from './cakes/cakeReducer';
import iceCreamReducer from './iceCream/iceCreamReducer';
import { usersReducers } from './users/usersReducer';

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
    users: usersReducers
});

export default rootReducer;