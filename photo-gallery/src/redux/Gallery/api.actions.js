import { FETCH_DATA, IS_LOADING, SET_SEARCH } from "./api.types"
import CONSTANTS from '../../utils/Constants';
import { api } from '../../utils/Service';

export const setData = (data = []) => {
    return {
        type: FETCH_DATA,
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

export const fetchData = ({query, limit = 16, page = 1}) => {
    return async (dispatch) => {
        console.log("QERYYY" + query);
        const response = await api(`${CONSTANTS.BASE_URL}?q=${query}`, "GET");
        try {
            var result = {
                success: false
            };
            if (response.status >= 200 && response.status < 300) {
                const responseJson = await response.json();
                console.log(responseJson)
                result.success = true;
                result.body = responseJson;
                return result;
            } else {            
                const responseJson = await response.json();
                result.body = responseJson;
                return result;
            }
        } catch (error) {
            return error;
        }
    }
}