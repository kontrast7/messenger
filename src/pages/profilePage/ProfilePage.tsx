import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  followUnFollowUserTC,
  setCurrentProfileTC,
} from "../../bll/reducer/usersReducer";
import { selectUsersAll } from "../../bll/selector/selectors";
import { Spinner } from "../../components/spinner/spinner";
import { ErrorSnackbar } from "../../components/errorSnackbar/ErrorSnackbar";
import { routes } from "../../bll/routes/routes";
import { createChatRoomTC } from "../../bll/reducer/roomsReducer";
import { Follow, GoToMessages } from "../contactsPage/contact/styles/styles";
//@ts-ignore
import defaultUserIcon from "../../assets/images/icons/default-user-icon.svg";
//@ts-ignore
import messageIcon from "../../assets/images/icons/message-icon.svg";
import { changeInitialized } from "../../bll/reducer/appReducer";
import {
  Wrapper,
  Avatar,
  EditProfile,
  ButtonWrapper,
  UserName,
  InfoWrapper,
  City,
  Description,
  Email,
} from "./styles/styles";
import { getCurrentUserId } from "../../utils/getCurrentUserId";
import { ShowPosts } from "./styles/styles";
import { selectIsLoggedIn } from "../../bll/selector/selectors";

export const ProfilePage = () => {
  const { id } = useParams();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const users = useSelector(selectUsersAll);

  const currentUserId = getCurrentUserId();

  useEffect(() => {
    id && dispatch(setCurrentProfileTC(id));
    dispatch(changeInitialized(false));
  }, [id]);

  const followUserHandler = (id: string, action: "follow" | "unfollow") => {
    dispatch(followUnFollowUserTC(id, action, currentUserId));

    if (action === "follow") {
      dispatch(createChatRoomTC({ id, currentUserId }));
    }
  };

  let user = users.filter((u) => u._id === id)[0];

  if (!user) return <Spinner />;
  if (!isLoggedIn) return <Navigate to={routes.login} />;

  return (
    <Wrapper>
      <Avatar
        src={user.profilePicture ? user.profilePicture : defaultUserIcon}
        alt={"photo"}
      />
      <UserName>{user.username}</UserName>
      {id === currentUserId ? (
        <EditProfile to={routes.editProfile}>Edit Profile</EditProfile>
      ) : (
        <ButtonWrapper>
          <GoToMessages
            disabled={!user.followers.includes(currentUserId)}
            to={`/chat/${currentUserId}/${user._id}`}
          >
            <img src={messageIcon} alt="Navigate to chat room" />
          </GoToMessages>

          {user.followers.includes(currentUserId) ? (
            <Follow onClick={() => followUserHandler(user._id, "unfollow")}>
              -
            </Follow>
          ) : (
            <Follow onClick={() => followUserHandler(user._id, "follow")}>
              +
            </Follow>
          )}
        </ButtonWrapper>
      )}

      <InfoWrapper>
        {user.desc && <Description>Description: {user.desc}</Description>}
        <Email>Email: {user.email}</Email>
        {user.city && <City>City: {user.city}</City>}
      </InfoWrapper>

      <ShowPosts>Show Posts</ShowPosts>

      <ErrorSnackbar />
    </Wrapper>
  );
};
