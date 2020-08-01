import {combineReducers} from 'redux';
import gallery_reducer from './Gallery/api.reducer';

const root_reducer = combineReducers({
    gallery_reducer
});

export default root_reducer;