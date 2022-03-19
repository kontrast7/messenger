import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getChatRoomTC } from "../../bll/reducer/roomsReducer";
import {
  createMessageTC,
} from "../../bll/reducer/messageReducer";
import { Spinner } from "../../components/spinner/spinner";
import { selectChatRoom, selectMessages } from "../../bll/selector/selectors";
import { getCurrentUserId } from "../../utils/getCurrentUserId";

export const ChatPage = () => {
  const [input, setInput] = useState("");
  const { id } = useParams();
  const currentUserId = getCurrentUserId();
  const dispatch = useDispatch();
  const messages = useSelector(selectMessages);
  const chatRoomId = useSelector(selectChatRoom);

  useEffect(() => {
    dispatch(getChatRoomTC(id!, currentUserId));
  }, []);


  const sendMessageHandler = () => {
    dispatch(
      createMessageTC({
        conversationId: chatRoomId[0]._id,
        sender: currentUserId,
        text: input,
      })
    );

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
