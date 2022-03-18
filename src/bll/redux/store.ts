import { combineReducers, createStore } from "redux";
import { appReducer } from "../reducer/appReducer";
import { applyMiddleware } from "redux";
import { usersReducer } from "../reducer/usersReducer";
import thunk from "redux-thunk";
import { registerReducer } from "../reducer/registerReducer";
import { loginReducer } from "../reducer/loginReducer";

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  app: appReducer,
  users: usersReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootAppStateType = ReturnType<typeof rootReducer>;

//@ts-ignore
window.store = store;
