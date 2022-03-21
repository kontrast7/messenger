import { Dispatch } from "redux";
import { chatRoomsApi } from "../../api/api";
import { getMessagesByChatId } from "./messageReducer";
import { ThunkDispatch } from "redux-thunk";
import { RootAppStateType } from "../redux/store";
import { changeStatus } from "./appReducer";
import { serverErrorHandling } from "../../utils/serverHandleError";

const initState: Array<initStatePropsType> = [];

export const postsReducer = (state = initState, action: ActionType) => {
  switch (action.type) {
    default:
      return state;
  }
};

//AC

//Thunk

// Types
export type initStatePropsType = {
  _id: string;
  likes: [];
  userId: string;
  desc: string;
  createdAt: string;
  updatedAt: string;
};
type ActionType = any;
