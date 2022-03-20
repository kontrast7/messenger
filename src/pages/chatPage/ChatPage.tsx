import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getChatRoomTC } from "../../bll/reducer/roomsReducer";
import {
  createMessageTC,
  getMessagesByChatId,
} from "../../bll/reducer/messageReducer";
import { Spinner } from "../../components/spinner/spinner";
import { selectChatRoom, selectMessages } from "../../bll/selector/selectors";
import { getCurrentUserId } from "../../utils/getCurrentUserId";
import { selectStatus } from "../../bll/selector/selectors";
import { routes } from "../../bll/routes/routes";
import { ErrorSnackbar } from "../../components/errorSnackbar/ErrorSnackbar";

export const ChatPage = () => {
  const [input, setInput] = useState("");
  const { currentUserId, id } = useParams();
  const currentUserIdLs = getCurrentUserId();
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(getChatRoomTC(id!, currentUserIdLs));
  }, []);

  const messages = useSelector(selectMessages);
  const chatRoomId = useSelector(selectChatRoom);
  //"6234c3cb7e123000232cdbf9"

  const sendMessageHandler = () => {
    dispatch(
      createMessageTC({
        conversationId: chatRoomId[0]._id,
        sender: currentUserIdLs,
        text: input,
      })
    );

    setInput("");
  };

  if (!messages) return <Spinner />;
  if (status === "loading") return <Spinner />;
  if (currentUserId !== currentUserIdLs)
    return <Navigate to={routes.pageNotFound} />;

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessageHandler}>send</button>
      {messages.map((m) => {
        return <div key={Math.random()}>{JSON.stringify(m.text)}</div>;
      })}
      <ErrorSnackbar />
    </div>
  );
};
