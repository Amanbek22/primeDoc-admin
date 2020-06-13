import {combineReducers, compose, createStore} from "redux";


let reducers = combineReducers({})

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers())

export default store
