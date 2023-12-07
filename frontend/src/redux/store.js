import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as appReducer } from "./app/reducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  appReducer: appReducer,
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
