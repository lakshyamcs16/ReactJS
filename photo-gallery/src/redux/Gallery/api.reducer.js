import { FETCH_DATA, IS_LOADING, ERROR, SET_SEARCH, REQUEST_DETAILS, MORE_DATA, PAGE_NUMBER } from "./api.types"

const initialState = {
    images : null,
    loading: false,
    error: null,
    search: '',
    page_number: 1,
    request_details: {
        requested_url: `API Request URL will appear here`,
        is_cached: false,
        time_taken: null
    }
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
                ...state,
                loading: false,
                images: [],
                error: action.payload
            };
        case SET_SEARCH:
            return {
                ...state,
                search: action.payload
            };
        case REQUEST_DETAILS:
            return {
                ...state,
                request_details: action.payload
            };
        case MORE_DATA: 
            return {
                ...state,
                images: [...state.images, ...action.payload]
            };
        case PAGE_NUMBER: 
            return {
                ...state,
                page_number: action.payload
            }
        default:
            return state;
    }
}

export default gallery_reducer;