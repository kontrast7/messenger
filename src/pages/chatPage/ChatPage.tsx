import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getChatRoomTC } from "../../bll/reducer/roomsReducer";
import {
  createMessageTC,
  getMessagesByChatId,
} from "../../bll/reducer/messageReducer";
import { Spinner } from "../../components/spinner/spinner";
import { selectChatRoom, selectMessages } from "../../bll/selector/selectors";

export const ChatPage = () => {
  const [input, setInput] = useState("");
  const { id } = useParams();
  const currentUserId = JSON.parse(localStorage.getItem("user") as string)._id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChatRoomTC(id!, currentUserId));
  }, []);

  const messages = useSelector(selectMessages);

  const chatRoomId = useSelector(selectChatRoom);
  const sendMessageHandler = () => {
    dispatch(
      createMessageTC({
        conversationId: chatRoomId[0]._id,
        sender: currentUserId,
        text: input,
      })
    );
    dispatch(getMessagesByChatId(chatRoomId[0]._id));
    setInput("");
  };
  if (!messages) return <Spinner />;
  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessageHandler}>send</button>
      {messages.map((m) => {
        return <div key={Math.random()}>{JSON.stringify(m.text)}</div>;
      })}
    </div>
  );
};
