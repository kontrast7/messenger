import { Wrapper } from "./styles/styles";
import React from "react";
import { routes } from "../../bll/routes/routes";
import { useSelector } from "react-redux";
import { selectCurrentLoggedInUser } from "../../bll/selector/selectors";
import { getCurrentUser } from "../../utils/getCurrentUserId";
import { NavigationIcons } from "./styles/styles";
//@ts-ignore
import defaultUserIcon from "../../assets/images/icons/default-user-icon-black.svg";
//@ts-ignore
import messageIcon from "../../assets/images/icons/message-icon.svg";
//@ts-ignore
import contactsIcon from "../../assets/images/icons/contacts-icon.svg";
import { Avatar } from "./styles/styles";

export const Navigation = () => {
  const currentUserLs = getCurrentUser();
  const currentLoggedInUser = useSelector(selectCurrentLoggedInUser);

  let currentUser = currentUserLs ? currentUserLs : currentLoggedInUser;

  return (
    <Wrapper>
      {currentUser && currentUser._id && (
        <NavigationIcons to={`/user/${currentUser._id}`}>
          <Avatar
            src={
              currentUser.profilePicture
                ? currentUser.profilePicture
                : defaultUserIcon
            }
            alt="Profile page"
          />
        </NavigationIcons>
      )}
      <NavigationIcons to={routes.contacts}>
        <Avatar src={contactsIcon} alt="Contacts page" />
      </NavigationIcons>
      <NavigationIcons to={routes.messenger}>
        <Avatar src={messageIcon} alt="Message page" />
      </NavigationIcons>
    </Wrapper>
  );
};
