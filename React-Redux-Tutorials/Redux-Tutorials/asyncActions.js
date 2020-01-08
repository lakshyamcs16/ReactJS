const redux = require('redux')
const axios = require('axios')
const reduxThunk = require('redux-thunk').default
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

const initialState = {
    loading: false,
    users: [],
    error: ''
};

const FETCH_USER_REQUESTS = 'FETCH_USER_REQUESTS';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

const fetchUsers = () => {
    return {
        type: FETCH_USER_REQUESTS
    }
}

const SuccessResponse = users => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    }
}

const ErrorResponse = error => {
    return {
        type: FETCH_USER_ERROR,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUESTS:
            return {
                ...state,
                loading: true
            }            
        case FETCH_USER_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        
        case FETCH_USER_ERROR:
            return {
                loading: false,
                users: [],
                error: action.payload
            }

        default: state
    }
}

const fetchUsersRequest = () => {
    return function(dispatch) {
        dispatch(fetchUsers())
        axios.get('https://jsonplaceholer.typicode.com/users')
        .then(response => {
            const ids = response.data.map((val) => val.id)            
            dispatch(SuccessResponse(ids));
        })
        .catch(error => {
            dispatch(ErrorResponse(error.message))
        })
    }
}

const store = createStore(reducer, applyMiddleware(reduxThunk));
const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
});
store.dispatch(fetchUsersRequest());
