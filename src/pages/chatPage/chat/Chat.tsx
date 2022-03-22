import { initStatePropsTypeMessage } from "../../../bll/reducer/messageReducer";
import {
  SentMessage,
  ReceivedMessage,
  InfoWrapper,
  ReceivedMessageTime,
  SentMessageTime,
  Text,
} from "./styles/styles";
import { deleteMessageType } from "../../../api/api";
import { deleteMessageById } from "../../../bll/reducer/messageReducer";
import { useDispatch } from "react-redux";
import { getCurrentUserId } from "../../../utils/getCurrentUserId";
import { DeleteButton } from "./styles/styles";
import { hoursMinutesDateParse } from "../../../utils/parseDate";

export const Chat = ({ myChat, message }: ChatPropsType) => {
  const dispatch = useDispatch();
  const currentUserId = getCurrentUserId();

  const deleteMessageHandler = () => {
    const payload: deleteMessageType = {
      userId: currentUserId,
      idMessage: message._id,
      chatroomId: message.conversationId,
    };

    dispatch(deleteMessageById(payload));
  };

  return (
    <>
      {myChat ? (
        <SentMessage>
          <InfoWrapper>
            <DeleteButton onClick={deleteMessageHandler}>x</DeleteButton>
            <Text>{message.text}</Text>
            <SentMessageTime>
              {hoursMinutesDateParse(message.createdAt)}
            </SentMessageTime>
          </InfoWrapper>
        </SentMessage>
      ) : (
        <ReceivedMessage>
          <InfoWrapper>
            <Text>{message.text}</Text>
            <ReceivedMessageTime>
              {hoursMinutesDateParse(message.createdAt)}
            </ReceivedMessageTime>
          </InfoWrapper>
        </ReceivedMessage>
      )}
    </>
  );
};

type ChatPropsType = {
  message: initStatePropsTypeMessage;
  myChat: boolean;
};
