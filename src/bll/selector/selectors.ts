import { RootAppStateType } from "../redux/store";

export const selectTheme = (state: RootAppStateType) => state.app.theme;
export const selectUsersAll = (state: RootAppStateType) => state.users;
export const selectStatus = (state: RootAppStateType) => state.app.status;
export const selectMessages = (state: RootAppStateType) => state.messages;
export const selectChatRoom = (state: RootAppStateType) => state.rooms;
export const selectIsLoggedIn = (state: RootAppStateType) =>
  state.app.isLoggedIn;
export const selectIsInitialized = (state: RootAppStateType) =>
  state.app.isInitialized;
export const selectIsMessage = (state: RootAppStateType) =>
  state.app.isMesage;
export const selectCurrentLoggedInUser = (state: RootAppStateType) =>
  state.login;
export const selectCurrentUserStateApp = (state: RootAppStateType) =>
  state.app.currentUser;
export const selectCurrentUserPosts = (state: RootAppStateType) =>
  state.posts;
export const selectIsLoadingPosts = (state: RootAppStateType) =>
  state.app.loadingPosts;