import { Wrapper } from "./styles/styles";
import React, { useEffect } from "react";
import { routes } from "../../bll/routes/routes";
import { useSelector } from "react-redux";
import {
  selectCurrentLoggedInUser,
  selectCurrentUserStateApp,
} from "../../bll/selector/selectors";
import { getCurrentUser } from "../../utils/getCurrentUserId";
import {
  changeCurrentUser,
  setIsLoggedInAC,
} from "../../bll/reducer/appReducer";
import { useDispatch } from "react-redux";
import { Avatar, ExitIcons, NavigationIcons } from "./styles/styles";
import { Spinner } from "../spinner/spinner";
//@ts-ignore
import defaultUserIcon from "../../assets/images/icons/default-user-icon-black.svg";
//@ts-ignore
import messageIcon from "../../assets/images/icons/message-icon.svg";
//@ts-ignore
import contactsIcon from "../../assets/images/icons/contacts-icon.svg";
//@ts-ignore
import newsIcon from "../../assets/images/icons/news-icon.svg";

export const Navigation = () => {
  const dispatch = useDispatch();
  const currentUserLs = getCurrentUser();
  const currentUserLsPic = getCurrentUser() && getCurrentUser().profilePicture;
  const currentLoggedInUser = useSelector(selectCurrentLoggedInUser);
  const currentUser = useSelector(selectCurrentUserStateApp);
  useEffect(() => {
    dispatch(changeCurrentUser(currentUserLs));
  }, [currentUserLsPic, currentLoggedInUser, dispatch]);

  if (!currentUser) return <Spinner />;

  return (
    <Wrapper>
      {currentUser._id && (
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
      </NavigationIcons>{" "}
      <NavigationIcons to={routes.postsTape}>
        <Avatar src={newsIcon} alt="News page" />
      </NavigationIcons>
    </Wrapper>
  );
};
