import { changeThemeAC } from "../bll/redcuer/appReducer";
import { Dispatch } from "redux";
import { changeThemeType } from "../bll/redcuer/appReducer";

export const changeTheme = (
  theme: any,
  dispatch: Dispatch<changeThemeType>
) => {
  if (theme === "dark") {
    localStorage.setItem("theme", "light");
    dispatch(changeThemeAC("light"));
  } else {
    localStorage.setItem("theme", "dark");
    dispatch(changeThemeAC("dark"));
  }
};
