import { RootAppStateType } from "../redux/store";

export const selectTheme = (state: RootAppStateType) => state.app.theme;
export const selectUsersAll = (state: RootAppStateType) => state.users;
export const selectStatus = (state: RootAppStateType) => state.app.status;
export const selectMessages = (state: RootAppStateType) => state.messages;
export const selectChatRoom = (state: RootAppStateType) => state.rooms;
export const selectIsLoggedIn = (state: RootAppStateType) => state.app.isLoggedIn;
