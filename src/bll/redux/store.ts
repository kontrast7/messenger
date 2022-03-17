import { combineReducers, createStore } from "redux";
import { registerReducer } from "bll/redcuer/registerReducer";
import { loginReducer } from "bll/redcuer/loginReducer";
import { applyMiddleware } from "redux"
import thunk from "redux-thunk"

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootAppStateType = ReturnType<typeof rootReducer>;

//@ts-ignore
window.store = store;