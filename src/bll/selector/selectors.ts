import { useSelector } from "react-redux";
import { RootAppStateType } from "../redux/store";

export const selectTheme = (state: RootAppStateType) => state.app.theme;
