import { combineReducers, createStore } from "redux";
import { registerReducer } from "bll/reducer/registerReducer";
import { loginReducer } from "bll/reducer/loginReducer";
import { appReducer } from "../reducer/appReducer";
import { applyMiddleware } from "redux";
import { usersReducer } from "../reducer/usersReducer";
import { roomsReducer } from "../reducer/roomsReducer";
import { messageReducer } from "../reducer/messageReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  app: appReducer,
  users: usersReducer,
  rooms: roomsReducer,
  messages: messageReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootAppStateType = ReturnType<typeof rootReducer>;

//@ts-ignore
window.store = store;
