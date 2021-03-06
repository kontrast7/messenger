import React from "react";
import { initStatePropsType } from "../../../bll/reducer/usersReducer";
import { followUnFollowUserTC } from "../../../bll/reducer/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { createChatRoomTC } from "../../../bll/reducer/roomsReducer";
import { getCurrentUserId } from "../../../utils/getCurrentUserId";
import { ErrorSnackbar } from "../../../components/errorSnackbar/ErrorSnackbar";
import { Content, Wrapper } from "./styles/styles";
import { Username } from "./styles/styles";
import { GoToMessages } from "./styles/styles";
import { Follow } from "./styles/styles";
import { Avatar } from "../../../styles/global";
//@ts-ignore
import messageIcon from "../../../assets/images/icons/message-icon.svg";
//@ts-ignore
import defaultUserIcon from "../../../assets/images/icons/default-user-icon.svg";
import { Spinner } from "../../../components/spinner/spinner";
import { selectStatus } from "../../../bll/selector/selectors";

export const Contact = ({ contact }: ContactPropsType) => {
  const currentUserId = getCurrentUserId();
  const dispatch = useDispatch();

  const followUserHandler = (id: string, action: "follow" | "unfollow") => {
    dispatch(followUnFollowUserTC(id, action, currentUserId));
    if (action === "follow") {
      dispatch(createChatRoomTC({ id, currentUserId }));
    }
  };
  const status = useSelector(selectStatus);
  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <Content>
        <Username to={`/user/${contact._id}`}>
          <Avatar
            src={
              contact.profilePicture ? contact.profilePicture : defaultUserIcon
            }
            alt={"Avatar"}
          />
          <p>{contact.username}</p>
        </Username>
      </Content>
      {contact.followers.includes(currentUserId) ? (
        <GoToMessages to={`/chat/${currentUserId}/${contact._id}`}>
          <img src={messageIcon} alt="Navigate to chat room" />
        </GoToMessages>
      ) : (
        <Follow onClick={() => followUserHandler(contact._id, "follow")}>
          +
        </Follow>
      )}
      <ErrorSnackbar />
    </Wrapper>
  );
};

export type ContactPropsType = {
  contact: initStatePropsType;
};
