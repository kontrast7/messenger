import { Dispatch } from "redux";
import { chatRoomsApi } from "../../api/api";
import { getMessagesByChatId } from "./messageReducer";
import { ThunkDispatch } from "redux-thunk";
import { RootAppStateType } from "../redux/store";

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
  };
};

//Thunk
export const createChatRoomTC = (payload: any) => (dispatch: Dispatch) => {
  chatRoomsApi.createChatRoom(payload).then((res) => {
    dispatch(addedChatRoomAC(res.data));
    console.log(res.data);
  });
};

export const getChatRoomTC =
  (idCurrentUser: string, idOtherUser: string) =>
  (dispatch: ThunkDispatch<RootAppStateType, void, any>) => {
    chatRoomsApi.goToChatRoom(idCurrentUser, idOtherUser).then((res) => {
      dispatch(addedChatRoomAC(res.data));
      console.log(res.data);
      dispatch(getMessagesByChatId(res.data._id));
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
