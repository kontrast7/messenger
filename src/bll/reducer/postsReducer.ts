import { Dispatch } from "redux";
import {
  chatRoomsApi,
  createNewPostsType,
  postsApi,
  usersApi,
} from "../../api/api";
import { getMessagesByChatId } from "./messageReducer";
import { ThunkDispatch } from "redux-thunk";
import { RootAppStateType } from "../redux/store";
import {
  changeCurrentUser,
  changeStatus,
  setIsLoadingPosts,
} from "./appReducer";
import { serverErrorHandling } from "../../utils/serverHandleError";
import { resizeFile } from "../../utils/resizeFile";

const initState: Array<initStatePropsType> = [];

export const postsReducer = (state = initState, action: ActionType) => {
  switch (action.type) {
    case "APP/POSTS/SET-ALL-POSTS":
      return action.data;
    default:
      return state;
  }
};

//AC
const setAllPosts = (data: initStatePropsType) => {
  return {
    type: "APP/POSTS/SET-ALL-POSTS",
    data,
  } as const;
};

//Thunk
export const getAllPostsUser = (username: string) => (dispatch: Dispatch) => {
  postsApi.getPostsByName(username).then((res) => {
    dispatch(setAllPosts(res.data));
    dispatch(setIsLoadingPosts(true));
    console.log(res.data);
  });
};

export const sendNewPostTC =
  (payload: createNewPostsType) => (dispatch: Dispatch) => {
    if (payload.img) {
      resizeFile(payload.img).then((res) => {
        payload.img = res;

        postsApi
          .createNewPosts(payload)
          .then((res) => {
            dispatch(changeStatus("completed"));
          })
          .catch((err) => {
            serverErrorHandling(err, dispatch);
          });
      });
    } else {
      postsApi
        .createNewPosts(payload)
        .then((res) => {
          dispatch(changeStatus("completed"));
        })
        .catch((err) => {
          serverErrorHandling(err, dispatch);
        });
    }
  };

// Types
export type initStatePropsType = {
  _id: string;
  likes: [];
  userId: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
};
type ActionType = ReturnType<typeof setAllPosts>;
