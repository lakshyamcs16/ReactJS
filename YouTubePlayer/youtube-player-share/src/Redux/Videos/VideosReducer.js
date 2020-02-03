import { VIDEOS, IS_FIRST_VIDEO, SELECTED_VIDEO } from "./VideosTypes"

const initialState = {
    videos : [],
    selectedVideo: null,
    isFirstVideo: true
}

const videosReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_FIRST_VIDEO:
            return {
                ...state,
                isFirstVideo: action.payload
            }; 
        case VIDEOS:
        return {
            ...state,
            videos: action.payload
        }; 
        case SELECTED_VIDEO:
        return {
            ...state,
            selectedVideo: action.payload
        }; 
        default:
            return state;
    }
}

export default videosReducer;