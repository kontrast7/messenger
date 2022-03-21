import { combineReducers, createStore } from "redux";
import { appReducer } from "../reducer/appReducer";
import { applyMiddleware } from "redux";
import { usersReducer } from "../reducer/usersReducer";
import { roomsReducer } from "../reducer/roomsReducer";
import { messageReducer } from "../reducer/messageReducer";
import { registerReducer } from "../reducer/registerReducer";
import { loginReducer } from "../reducer/loginReducer";
import thunk from "redux-thunk";
import { postsReducer } from "../reducer/postsReducer";

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  app: appReducer,
  users: usersReducer,
  rooms: roomsReducer,
  messages: messageReducer,
  posts: postsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootAppStateType = ReturnType<typeof rootReducer>;

//@ts-ignore
window.store = store;
