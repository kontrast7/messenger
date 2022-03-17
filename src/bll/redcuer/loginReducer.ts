import { Dispatch } from "redux";
import { authApi, loginUserType } from "../../api/api";

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
    authApi.loginUser(payload).then((res) => {
      dispatch(setUserDataAC(res.data));
      console.log(res);
      localStorage.setItem("user", JSON.stringify(res.data))
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
