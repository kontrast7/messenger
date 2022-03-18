import { authApi } from "../../api/api";
import { Dispatch } from "react";
import { registerUserType } from "../../api/api";
import { changeStatus } from "./appReducer";
import { setIsRegisteredInAC } from "./appReducer";
import { serverErrorHandling } from "../../utils/serverHandleError";

const initState: initStatePropsType = {};

export const registerReducer = (state = initState, action: ActionType) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Thunk Creators
export const registerTC =
  ({ username, email, password }: registerUserType) =>
  (dispatch: Dispatch<ActionType>) => {
    dispatch(changeStatus("loading"));

    const payload: registerUserType = {
      username,
      email,
      password,
    };

    authApi
      .registerUser(payload)
      .then((res) => {
        dispatch(changeStatus("completed"));
        dispatch(setIsRegisteredInAC(true));
      })
      .catch((err) => {
        serverErrorHandling(err, dispatch);
      });
  };

// Types

type initStatePropsType = {};

type ActionType = any;
