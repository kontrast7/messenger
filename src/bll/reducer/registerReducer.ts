import { authApi } from "../../api/api";
import { Dispatch } from "react";
import { registerUserType } from "../../api/api";
import { changeStatus } from "./appReducer";
import { setIsRegisteredInAC } from "./appReducer";
import { serverErrorHandling } from "../../utils/serverHandleError";
import { routes } from "../routes/routes";

const initState: initStatePropsType = {};

export const registerReducer = (state = initState, action: ActionType) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Thunk Creators
export const registerTC =
  (payload: registerUserType, navigate: (path: string) => void) =>
  (dispatch: Dispatch<ActionType>) => {
    dispatch(changeStatus("loading"));

    authApi
      .registerUser(payload)
      .then((res) => {
        dispatch(changeStatus("completed"));
        dispatch(setIsRegisteredInAC(true));
        navigate(routes.login);
      })
      .catch((err) => {
        serverErrorHandling(err, dispatch);
      });
  };

// Types

type initStatePropsType = {};
type RegisterPropsType = {
  payload: registerUserType;
  navigate: string;
};

type ActionType = any;
