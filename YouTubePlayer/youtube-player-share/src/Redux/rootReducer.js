import {combineReducers} from 'redux';
import videosReducer from './Videos/VideosReducer';

const rootReducer = combineReducers({
    videosReducer: videosReducer
});

export default rootReducer;