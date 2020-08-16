import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import thunk from "redux-thunk";

const middlewares = [thunk];

const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

const initialState = {};

const store = createStore(reducers, initialState, enhancer);

export default store;
