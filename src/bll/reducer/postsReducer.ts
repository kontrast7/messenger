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
    case "POSTS/TOGGLE-POST-LIKE": {
      const stateCopy = [...state];
      const currentPost = stateCopy.find((post) => post._id === action.postId);
      //@ts-ignore
      if (currentPost.likes.includes(action.userId)) {
        //@ts-ignore
        const temp = currentPost.likes.filter(
          (userId) => userId !== action.userId
        );

        const state = stateCopy.find((post) => post._id === action.postId);

        //@ts-ignore
        state.likes = temp;
      } else {
        //@ts-ignore
        currentPost.likes.push(action.userId);
      }
      //@ts-ignore
      // return state.filter((item) => item._id === action.postId && item.likes.includes(action.userId) ? item.likes.splice(action.userId) : item.likes.push(action.userId))

      return stateCopy;
    }
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

export const togglePostLike = (postId: string, userId: string) => {
  return { type: "POSTS/TOGGLE-POST-LIKE", postId, userId } as const;
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

export const reactOnPost =
  (postId: string, userId: string) => (dispatch: Dispatch) => {
    dispatch(changeStatus("loading"));
    return postsApi
      .reactOnPost(postId, userId)
      .then((res) => {
        dispatch(changeStatus("completed"));
        dispatch(togglePostLike(postId, userId));
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
type ActionType =
  | ReturnType<typeof setAllPosts>
  | ReturnType<typeof togglePostLike>;
