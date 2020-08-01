import { FETCH_DATA, IS_LOADING, SET_SEARCH, REQUEST_DETAILS, MORE_DATA, PAGE_NUMBER, ERROR } from "./api.types"
import CONSTANTS from '../../utils/Constants';
import { api } from '../../utils/Service';

export const setData = (data = []) => {
    return {
        type: FETCH_DATA,
        payload: data
    }
}

export const setError = (error = null) => {
    return {
        type: ERROR,
        payload: error
    }
}

export const setMoreData = (data = []) => {
    return {
        type: MORE_DATA,
        payload: data
    }
}

export const setLoading = (loading = false) => {
    return {
        type: IS_LOADING,
        payload: loading
    }
}

export const setSearchQuery = (query = '') => {
    return {
        type: SET_SEARCH,
        payload: query
    }
}

export const setRequestDetails = (req_details = {}) => {
    return {
        type: REQUEST_DETAILS,
        payload: req_details
    }
}

export const setPageNumber = (page = 1) => {
    return {
        type: PAGE_NUMBER,
        payload: page
    }
}

export const fetchData = ({query, limit = 16, page = 2}) => {
    return async (dispatch) => {
        
        let req_details = {
            requested_url: `${CONSTANTS.BASE_URL}?q=${query}&limit=${limit}&page=${page}`
        };
        let start_time = new Date().getTime();
        const response = await api(req_details.requested_url, "GET");
        let end_time   = new Date().getTime();

        req_details.time_taken = ((end_time - start_time)).toFixed(0) + ' ms';
        dispatch(setRequestDetails(req_details));
        try {
            let result = {
                success: false
            };
            if (response.status >= 200 && response.status < 300) {
                const responseJson = await response.json();
                result.success = true;
                result.body = responseJson;
                return result;
            } else {            
                result.body = response;
                return result;
            }
        } catch (error) {
            return error;
        } 
    }
}