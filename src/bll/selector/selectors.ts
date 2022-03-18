import { RootAppStateType } from "../redux/store";

export const selectTheme = (state: RootAppStateType) => state.app.theme;
export const selectUsersAll = (state: RootAppStateType) => state.users;
export const selectStatus = (state: RootAppStateType) => state.app.status;
