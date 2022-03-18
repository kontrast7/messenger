import { combineReducers, createStore } from "redux";
import { registerReducer } from "bll/reducer/registerReducer";
import { loginReducer } from "bll/reducer/loginReducer";
import { appReducer } from "../reducer/appReducer";
import { applyMiddleware } from "redux";
import { usersReducer } from "../reducer/usersReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  app: appReducer,
  users: usersReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootAppStateType = ReturnType<typeof rootReducer>;

//@ts-ignore
window.store = store;
