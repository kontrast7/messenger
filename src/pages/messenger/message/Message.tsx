import { initStatePropsType } from "../../../bll/reducer/usersReducer";
import { Wrapper } from "../../contactsPage/contact/styles/styles";
import { Content } from "../../contactsPage/contact/styles/styles";
import { Avatar } from "../../../styles/global";
//@ts-ignore
import defaultUserIcon from "../../../assets/images/icons/default-user-icon.svg";
import { Username } from "../../contactsPage/contact/styles/styles";
import { ErrorSnackbar } from "../../../components/errorSnackbar/ErrorSnackbar";
import React from "react";
import { InfoWrapper, ChatWithUser, AvatarLink } from "./styles/styles";
import { getCurrentUserId } from "../../../utils/getCurrentUserId";

export const Message = ({ contact }: MessagePropsType) => {
  const currentUserId = getCurrentUserId();

  return (
    <Wrapper>
      <Content>
        {/*<AvatarLink to={`/user/${contact._id}`}>*/}
        <Avatar
          src={
            contact.profilePicture ? contact.profilePicture : defaultUserIcon
          }
          alt={"Avatar"}
        />
        {/*</AvatarLink>*/}
        <InfoWrapper>
          <Username to={`/chat/${currentUserId}/${contact._id}`}>
            {contact.username}
          </Username>
          <ChatWithUser>Chat with {contact.username}...</ChatWithUser>
        </InfoWrapper>
      </Content>
      <ErrorSnackbar />
    </Wrapper>
  );
};

type MessagePropsType = {
  contact: Pick<initStatePropsType, "profilePicture" | "_id" | "username">;
};
