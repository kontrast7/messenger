import { initStatePropsTypeMessage } from "../../../bll/reducer/messageReducer";
import {
  SentMessage,
  ReceivedMessage,
  InfoWrapper,
  ReceivedMessageTime,
  SentMessageTime,
  Text,
} from "./styles/styles";

export const Chat = ({ myChat, message }: ChatPropsType) => {
  return (
    <>
      {myChat ? (
        <SentMessage>
          <InfoWrapper>
            <Text>{message.text}</Text>
            <SentMessageTime>12:00</SentMessageTime>
          </InfoWrapper>
        </SentMessage>
      ) : (
        <ReceivedMessage>
          <InfoWrapper>
            <Text>{message.text}</Text>
            <ReceivedMessageTime>16:13</ReceivedMessageTime>
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
