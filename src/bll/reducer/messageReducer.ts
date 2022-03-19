import { Dispatch } from "redux";
import { messagesApi, sendMessageType } from "../../api/api";

const initState: initStatePropsTypeMessage[] = [];

export const messageReducer = (state = initState, action: ActionType) => {
  switch (action.type) {
    case "APP/CHAT/ADDED_MESSAGE":
      return [...action.data];
    case "APP/CHAT/ADD-LAST-MESSAGE":
      return [...state, action.data];
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

export const addLastMessage = (data: initStatePropsTypeMessage) => {
  return {
    type: "APP/CHAT/ADD-LAST-MESSAGE",
    data,
  } as const;
};

//Thunk
export const createMessageTC =
  (payload: sendMessageType) => (dispatch: Dispatch) => {
    messagesApi.sendMessage({ ...payload }).then((res) => {
      dispatch(addLastMessage(res.data));
    });
  };

export const getMessagesByChatId = (chatId: string) => (dispatch: Dispatch) => {
  messagesApi.getMessagesByChatId(chatId).then((res) => {
    dispatch(setAllMessages(res.data));
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
  | ReturnType<typeof addLastMessage>;
