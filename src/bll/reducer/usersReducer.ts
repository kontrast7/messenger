import { Dispatch } from "redux";
import { chatRoomsApi, usersApi } from "../../api/api";
import { changeInitialized, changeStatus } from "./appReducer";
import { serverErrorHandling } from "../../utils/serverHandleError";
import { setIsLoggedInAC } from "./appReducer";
import { updateUserType } from "../../api/api";
import { ThunkDispatch } from "redux-thunk";
import { RootAppStateType } from "../redux/store";
import { resizeFile } from "../../utils/resizeFile";

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
      dispatch(changeInitialized(true))
    })
    .catch((err) => {
      serverErrorHandling(err, dispatch);
    }).finally(()=> {
  })
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

export const setUserFriendsTC = (id:string) => (dispatch: Dispatch) => {
  dispatch(changeStatus("loading"));
  usersApi.getUserFriendsById(id).then(res=> {
    dispatch(setAllUsersAC(res.data));
    dispatch(changeStatus("completed"));
    console.log(res.data)
  })
}

export const updateUserByIdTC =
  (payload: updateUserType, navigate: (path: string) => void) =>
  (dispatch: ThunkDispatch<RootAppStateType, void, any>) => {
    dispatch(changeStatus("loading"));

    // If we have picture parse it
    if (payload.profilePicture) {
      resizeFile(payload.profilePicture).then((res) => {
        payload.profilePicture = res;

        usersApi
          .updateUser(payload)
          .then((res) => {
            dispatch(changeStatus("completed"));
            navigate(`/user/${payload.userId}`);
          })
          .catch((err) => {
            serverErrorHandling(err, dispatch);
          });
      });
    } else {
      usersApi
        .updateUser(payload)
        .then((res) => {
          dispatch(changeStatus("completed"));
          navigate(`/user/${payload.userId}`);
        })
        .catch((err) => {
          serverErrorHandling(err, dispatch);
        });
    }
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
  desc: string
  city: string
};
type ActionType =
  | ReturnType<typeof setAllUsersAC>
  | ReturnType<typeof setSearchUserAC>;
