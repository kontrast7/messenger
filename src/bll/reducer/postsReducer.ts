import { Dispatch } from "redux";
import { createNewPostsType, deletePostType, postsApi } from "../../api/api";
import { RootAppStateType } from "../redux/store";
import { changeStatus, setIsLoadingPosts } from "./appReducer";
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
    dispatch(changeStatus("loading"));
    if (payload.img) {
      resizeFile(payload.img).then((res) => {
        payload.img = res;

        postsApi
          .createNewPosts(payload)
          .then(() => {
            dispatch(changeStatus("completed"));
          })
          .catch((err) => {
            serverErrorHandling(err, dispatch);
          });
      });
    } else {
      postsApi
        .createNewPosts(payload)
        .then(() => {
          dispatch(changeStatus("completed"));
        })
        .catch((err) => {
          serverErrorHandling(err, dispatch);
        });
    }
  };

export const editPostTC =
  (payload: createNewPostsType, idPost: string) =>
  (dispatch: any, getState: () => RootAppStateType) => {
    dispatch(changeStatus("loading"));
    const username = getState().users[0].username;
    if (payload.img) {
      resizeFile(payload.img).then((res) => {
        payload.img = res;
        postsApi
          .editPost(payload, idPost)
          .then(() => {
            dispatch(changeStatus("completed"));
            dispatch(getAllPostsUser(username));
          })
          .catch((err) => {
            serverErrorHandling(err, dispatch);
          });
      });
    } else {
      postsApi
        .editPost(payload, idPost)
        .then(() => {
          dispatch(changeStatus("completed"));
          dispatch(getAllPostsUser(username));
        })
        .catch((err) => {
          serverErrorHandling(err, dispatch);
        });
    }
  };

export const deletePostTC =
  (idPost: string, payload: deletePostType) =>
  (dispatch: any, getState: () => RootAppStateType) => {
    dispatch(changeStatus("loading"));
    const username = getState().users[0].username;
    postsApi
      .deletePost(idPost, payload)
      .then(() => {
        dispatch(changeStatus("completed"));
        dispatch(getAllPostsUser(username));
      })
      .catch((err) => {
        serverErrorHandling(err, dispatch);
      });
  };

export const getPostsTapeTC = (id: string) => (dispatch: any) => {
  dispatch(changeStatus("loading"));
  postsApi
    .getTimeLinePosts(id)
    .then((res) => {
      dispatch(setAllPosts(res.data));
      dispatch(changeStatus("completed"));
    })
    .catch((err) => {
      serverErrorHandling(err, dispatch);
    });
};

// Types
export type initStatePropsType = {
  _id: string;
  likes: [];
  userId: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
  img?: string;
};
type ActionType = ReturnType<typeof setAllPosts>;
