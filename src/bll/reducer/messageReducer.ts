import { Dispatch } from "redux";
import { messagesApi, sendMessageType } from "../../api/api";
import { changeStatus } from "./appReducer";
import { serverErrorHandling } from "../../utils/serverHandleError";

const initState: initStatePropsTypeMessage[] = [];

export const messageReducer = (state = initState, action: ActionType) => {
  switch (action.type) {
    case "APP/CHAT/ADDED_MESSAGE":
      return [...action.data];
    case "APP/CHAT/ADD-LAST-MESSAGE":
      return [...state, action.data];
    case "APP/CHAT/ADD_MESSAGE":
      return [...state, action.data]
    default:
      return state;
  }
};

//AC
export const setAllMessages = (data: initStatePropsTypeMessage[]) => {
  return {
    type: "APP/CHAT/ADDED_MESSAGE",
    data,
  } as const;
};
export const setMessage = (data: any) => {
  return {
    type: "APP/CHAT/ADD_MESSAGE",
    data,
  } as const;
};

export const addLastMessage = (data: initStatePropsTypeMessage) => {
  return {
    type: "APP/CHAT/ADD-LAST-MESSAGE",
    data,
  } as const;
};

//Thunk
export const createMessageTC =
  (payload: sendMessageType) => (dispatch: Dispatch) => {
    dispatch(changeStatus("loading"));

    messagesApi
      .sendMessage({ ...payload })
      .then((res) => {
        dispatch(changeStatus("completed"));
        dispatch(addLastMessage(res.data));
      })
      .catch((err) => {
        serverErrorHandling(err, dispatch);
      });
  };

export const getMessagesByChatId = (chatId: string) => (dispatch: Dispatch) => {
  dispatch(changeStatus("loading"));
  messagesApi
    .getMessagesByChatId(chatId)
    .then((res) => {
      dispatch(changeStatus("completed"));
      dispatch(setAllMessages(res.data));
    })
    .catch((err) => {
      serverErrorHandling(err, dispatch);
    });
};

// Types
export type initStatePropsTypeMessage = {
  _id: string;
  conversationId: string;
  sender: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
};
type ActionType =
  | ReturnType<typeof setAllMessages>
  | ReturnType<typeof addLastMessage>
  | ReturnType<typeof setMessage>
