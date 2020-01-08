const redux = require('redux')
const reduxLogger = require('redux-logger')

const reduxStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICE_CREAM = 'BUY_ICE_CREAM';

var initalCakeState = {
    numOfCakes: 10
};

var initalIceCreamState = {
    numOfIceCreams: 20
};

function buyCake() {
    return {
        type: BUY_CAKE
    }
}

function buyIceCream() {
    return {
        type: BUY_ICE_CREAM
    }
}

const cakeReducer = (state = initalCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }

        default:
            return state;
    }
}

const iceCreamReducer = (state = initalIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICE_CREAM:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = reduxStore(rootReducer, applyMiddleware(logger))
const unsubscribe = store.subscribe(() => {});
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())

unsubscribe()