import React from "react";
import { initStatePropsType } from "../../../bll/reducer/usersReducer";
import { followUnFollowUserTC } from "../../../bll/reducer/usersReducer";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createChatRoomTC } from "../../../bll/reducer/roomsReducer";
import { getCurrentUserId } from "../../../utils/getCurrentUserId"

export const Contact = ({ contact }: ContactPropsType) => {
  const currentUserId = getCurrentUserId();
  const dispatch = useDispatch();

  const followUserHandler = (id: string, action: "follow" | "unfollow") => {
    dispatch(followUnFollowUserTC(id, action, currentUserId));
    if (action === "follow") {
      dispatch(createChatRoomTC({ id, currentUserId }));
    }
  };

  return (
    <div>
      <Link to={`/user/${contact._id}`}>{contact.username}</Link>

      {contact.followers.includes(currentUserId) ? (
        <Link to={`/chat/${currentUserId}/${contact._id}`}>go to chat</Link>
      ) : (
        <button onClick={() => followUserHandler(contact._id, "follow")}>
          follow
        </button>
      )}
    </div>
  );
};

export type ContactPropsType = {
  contact: initStatePropsType;
};
