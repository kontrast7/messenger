import React from "react";
import { initStatePropsType } from "../../../bll/reducer/usersReducer";
import { followUnFollowUserTC } from "../../../bll/reducer/usersReducer";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const Contact = ({ contact }: ContactPropsType) => {
  const currentUserId = JSON.parse(localStorage.getItem("user") as string)._id;
  const dispatch = useDispatch();

  const followUserHandler = (id: string, action: "follow" | "unfollow") => {
    dispatch(followUnFollowUserTC(id, action, currentUserId));
  };

  return (
    <div>
      <Link to={`/user/${contact._id}`}>{contact.username}</Link>

      {contact.followers.includes(currentUserId) ? (
        <button onClick={() => followUserHandler(contact._id, "unfollow")}>
          unfollow
        </button>
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
