import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getChatRoomTC } from "../../bll/reducer/roomsReducer";
import { createMessageTC } from "../../bll/reducer/messageReducer";
import { Spinner } from "../../components/spinner/spinner";
import { selectChatRoom, selectMessages } from "../../bll/selector/selectors";
import { getCurrentUserId } from "../../utils/getCurrentUserId";
import { selectStatus } from "../../bll/selector/selectors";
import { routes } from "../../bll/routes/routes";
import { ErrorSnackbar } from "../../components/errorSnackbar/ErrorSnackbar";
import { Wrapper, ControlPanel, Content } from "./styles/styles";
import { ChatLog } from "./styles/styles";
import { SendMessage } from "./styles/styles";
//@ts-ignore
import messageIcon from "../../assets/images/icons/message-icon.svg";
import { Chat } from "./chat/Chat";
import { useRef } from "react";
import { selectIsLoggedIn } from "../../bll/selector/selectors";
import { onEnterPress } from "../../utils/onEnter"

export const ChatPage = () => {
  const [input, setInput] = useState("");
  const { currentUserId, id } = useParams();
  const currentUserIdLs = getCurrentUserId();
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(getChatRoomTC(id!, currentUserIdLs));
  }, []);

  const messages = useSelector(selectMessages);
  const chatRoomId = useSelector(selectChatRoom);

  const sendMessageHandler = () => {
    if (input.length !== 0) {
      dispatch(
        createMessageTC({
          conversationId: chatRoomId[0]._id,
          sender: currentUserIdLs,
          text: input,
        })
      );
    }
    setInput("");
  };

  const scrollItem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollItem.current) {
      scrollItem.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sendMessageHandler]);

  if (!messages) return <Spinner />;
  if (!isLoggedIn) return <Navigate to={routes.login} />;
  if (status === "loading") return <Spinner />;
  if (currentUserId !== currentUserIdLs)
    return <Navigate to={routes.pageNotFound} />;

  return (
    <Wrapper>
      <Content>
        {messages.map((m) => {
          return (
            <Chat
              myChat={currentUserId === m.sender}
              message={m}
              key={Math.random()}
            />
          );
        })}
        <div ref={scrollItem}></div>
      </Content>
      <ControlPanel>
        <ChatLog
          onKeyPress={(e) => onEnterPress(e, sendMessageHandler)}
          placeholder="Write"
          maxRows={8}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <SendMessage onClick={sendMessageHandler}>
          <img src={messageIcon} alt="Send message" />
        </SendMessage>
      </ControlPanel>
      <ErrorSnackbar />
    </Wrapper>
  );
};
