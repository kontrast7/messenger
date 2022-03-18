import { Dispatch } from "redux";
import { authApi, loginUserType } from "../../api/api";
import { changeStatus } from "./appReducer";
import { serverErrorHandling } from "../../utils/serverHandleError";
import { setIsLoggedInAC } from "./appReducer";

const initState = {};

export const loginReducer = (state = initState, action: ActionType) => {
  switch (action.type) {
    case "APP/LOGIN":
      return { ...action.data };
    default:
      return state;
  }
};

//AC
const setUserDataAC = (data: initStatePropsType) => {
  return {
    type: "APP/LOGIN",
    data,
  } as const;
};

export const setLoginUserTC =
  ({ ...payload }: loginUserType) =>
  (dispatch: Dispatch) => {
    dispatch(changeStatus("loading"));

    authApi
      .loginUser(payload)
      .then((res) => {
        dispatch(changeStatus("completed"));
        dispatch(setUserDataAC(res.data));
        dispatch(setIsLoggedInAC(true));
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((err) => {
        serverErrorHandling(err, dispatch);
      });
  };

// Types
type initStatePropsType = {
  coverPicture: string;
  createdAt: string;
  email: string;
  followers: string[];
  followings: string[];
  isAdmin: boolean;
  password: string;
  profilePicture: string;
  updatedAt: string;
  username: string;
  _id: string;
};

type ActionType = ReturnType<typeof setUserDataAC>;
