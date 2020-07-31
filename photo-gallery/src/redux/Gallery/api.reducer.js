import { FETCH_DATA, IS_LOADING, ERROR, SET_SEARCH } from "./api.types"

const initialState = {
    images : null,
    loading: false,
    error: null,
    search: 'naruto'
}

const gallery_reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA:
            return {
                ...state,
                error: null,
                images: action.payload
            }; 
        case IS_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case ERROR: 
            return {
                loading: false,
                images: [],
                error: action.payload
            };
        case SET_SEARCH:
            return {
                ...state,
                search: action.payload
            };
        default:
            return state;
    }
}

export default gallery_reducer;