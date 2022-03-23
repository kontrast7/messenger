import { Dispatch } from "redux";
import { chatRoomsApi } from "../../api/api";
import { getMessagesByChatId } from "./messageReducer";
import { ThunkDispatch } from "redux-thunk";
import { RootAppStateType } from "../redux/store";
import { changeStatus } from "./appReducer";
import { serverErrorHandling } from "../../utils/serverHandleError";

const initState: Array<initStatePropsType> = [];

export const roomsReducer = (state = initState, action: ActionType) => {
  switch (action.type) {
    case "APP/CHAT/ADDED_CHAT":
      return [action.data];
    default:
      return state;
  }
};

//AC
export const addedChatRoomAC = (data: initStatePropsType) => {
  return {
    type: "APP/CHAT/ADDED_CHAT",
    data,
  } as const;
};


//Thunk
export const createChatRoomTC = (payload: any) => (dispatch: Dispatch) => {
  dispatch(changeStatus("loading"));
  chatRoomsApi

    .createChatRoom(payload)
    .then((res) => {
      dispatch(addedChatRoomAC(res.data));
      dispatch(changeStatus("completed"));
    })
    .catch((err) => {
      serverErrorHandling(err, dispatch);
    });
};

export const getChatRoomTC =
  (idCurrentUser: string, idOtherUser: string) =>
  (dispatch: ThunkDispatch<RootAppStateType, void, any>) => {
    dispatch(changeStatus("loading"));

    chatRoomsApi
      .goToChatRoom(idCurrentUser, idOtherUser)
      .then((res) => {
        dispatch(changeStatus("completed"));
        dispatch(addedChatRoomAC(res.data));
        dispatch(getMessagesByChatId(res.data._id));
      })
      .catch((err) => {
        serverErrorHandling(err, dispatch);
      });
  };

// Types
export type initStatePropsType = {
  _id: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
};
type ActionType = ReturnType<typeof addedChatRoomAC>;
