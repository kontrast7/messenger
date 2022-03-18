import { Dispatch } from "redux";
import { chatRoomsApi, usersApi } from "../../api/api";
import { changeStatus } from "./appReducer";
import { serverErrorHandling } from "../../utils/serverHandleError";
import { setIsLoggedInAC } from "./appReducer";

const initState: Array<initStatePropsType> = [];

export const usersReducer = (state = initState, action: ActionType) => {
  switch (action.type) {
    case "APP/USERS/SET_ALL_USERS":
      return [...action.data];
    case "APP/USERS/SET_SEARCH_USERS":
      return [action.data];
    default:
      return state;
  }
};

//AC
const setAllUsersAC = (data: Array<initStatePropsType>) => {
  return {
    type: "APP/USERS/SET_ALL_USERS",
    data,
  } as const;
};
const setSearchUserAC = (data: initStatePropsType) => {
  return {
    type: "APP/USERS/SET_SEARCH_USERS",
    data,
  } as const;
};

//Thunk
export const setAllUsersTC = (myId: string) => (dispatch: Dispatch) => {
  dispatch(changeStatus("loading"));
  usersApi
    .getAllUsers(myId)
    .then((res) => {
      dispatch(changeStatus("completed"));
      dispatch(setAllUsersAC(res.data));
      dispatch(setIsLoggedInAC(true));
    })
    .catch((err) => {
      serverErrorHandling(err, dispatch);
    });
};
export const followUnFollowUserTC =
  (id: string, action: "follow" | "unfollow", currentUserId: string) =>
  (dispatch: Dispatch) => {
    dispatch(changeStatus("loading"));

    usersApi
      .followUnFollowUser(id, action, currentUserId)
      .then((res) => {
        usersApi
          .getAllUsers(currentUserId)
          .then((res) => {
            dispatch(changeStatus("completed"));
            dispatch(setAllUsersAC(res.data));
          })
          .catch((err) => {
            serverErrorHandling(err, dispatch);
          });
      })
      .catch((err) => {
        serverErrorHandling(err, dispatch);
      });
  };

export const searchByNameUserTC = (name: string) => (dispatch: Dispatch) => {
  usersApi.searchUsersByName(name).then((res) => {
    dispatch(setSearchUserAC(res.data));
  });
};

export const setCurrentProfileTC = (id: string) => (dispatch: Dispatch) => {
  usersApi.getUserById(id).then((res) => {
    dispatch(setSearchUserAC(res.data));
  });
};



// Types
export type initStatePropsType = {
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
type ActionType =
  | ReturnType<typeof setAllUsersAC>
  | ReturnType<typeof setSearchUserAC>;
