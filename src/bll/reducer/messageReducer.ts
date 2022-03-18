import { Dispatch } from "redux";
import { messagesApi, sendMessageType } from "../../api/api";

const initState: Array<initStatePropsTypeMessage> = [];

export const messageReducer = (state = initState, action: ActionType) => {
  switch (action.type) {
    case "APP/CHAT/ADDED_MESSAGE":
      return [action.data];
    default:
      return state;
  }
};

//AC
export const addedMessageAC = (data: initStatePropsTypeMessage) => {
  return {
    type: "APP/CHAT/ADDED_MESSAGE",
    data,
  };
};

//Thunk
export const createMessageTC =
  (payload: sendMessageType) => (dispatch: Dispatch) => {
    messagesApi
      .sendMessage({ ...payload })
      .then((res) => console.log(res.data));
  };

export const getMessagesByChatId = (chatId: string) => (dispatch: Dispatch) => {
  messagesApi.getMessagesByChatId(chatId).then((res) => {
    dispatch(addedMessageAC(res.data));
    console.log(res.data);
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
type ActionType = ReturnType<typeof addedMessageAC>;
