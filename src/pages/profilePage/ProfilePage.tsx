import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  followUnFollowUserTC,
  setCurrentProfileTC,
} from "../../bll/reducer/usersReducer";
import {
  selectCurrentUserPosts,
  selectIsLoadingPosts,
  selectUsersAll,
} from "../../bll/selector/selectors";
import { Spinner } from "../../components/spinner/spinner";
import { ErrorSnackbar } from "../../components/errorSnackbar/ErrorSnackbar";
import { routes } from "../../bll/routes/routes";
import { createChatRoomTC } from "../../bll/reducer/roomsReducer";
import { Follow, GoToMessages } from "../contactsPage/contact/styles/styles";
import {
  changeInitialized,
  setIsLoadingPosts,
  setIsMessageAC,
} from "../../bll/reducer/appReducer";
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
import { getAllPostsUser, sendNewPostTC } from "../../bll/reducer/postsReducer";
import { createNewPostsType } from "../../api/api";
import { Input } from "../../components/common/input/styles";
//@ts-ignore
import messageIcon from "../../assets/images/icons/message-icon.svg";
//@ts-ignore
import defaultUserIcon from "../../assets/images/icons/default-user-icon.svg";

export const ProfilePage = () => {
  const [show, setShow] = useState(false);
  const [showAddedPost, setShowAddedPost] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [profileImage, setProfileImage] = useState<Blob>();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const users = useSelector(selectUsersAll);
  const loadingPosts = useSelector(selectIsLoadingPosts);
  const posts = useSelector(selectCurrentUserPosts);
  const currentUserId = getCurrentUserId();
  let user = users.filter((u) => u._id === id)[0];

  const followUserHandler = (id: string, action: "follow" | "unfollow") => {
    dispatch(followUnFollowUserTC(id, action, currentUserId));

    if (action === "follow") {
      dispatch(createChatRoomTC({ id, currentUserId }));
    }
  };

  useEffect(() => {
    id && dispatch(setCurrentProfileTC(id));
    dispatch(changeInitialized(false));
    dispatch(setIsLoadingPosts(false));
    dispatch(setIsMessageAC(false));
    setShow(false);
  }, [id]);

  const showPostsHandler = () => {
    user && dispatch(getAllPostsUser(user.username));
    setShow(!show);
    setShowAddedPost(false);
  };
  const showAddedPostsHandler = () => {
    setShowAddedPost(!showAddedPost);
    setShow(false);
  };
  const sendNewPostHandler = () => {
    const payload: createNewPostsType = {
      userId: currentUserId,
      desc: inputValue,
    };
    profileImage && (payload.img = profileImage);
    dispatch(sendNewPostTC(payload));
    setInputValue("");
  };

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

      <ShowPosts onClick={showPostsHandler}>Show Posts</ShowPosts>

      {id === currentUserId && (
        <ShowPosts onClick={showAddedPostsHandler}>Add Post</ShowPosts>
      )}

      {id === currentUserId && showAddedPost && !show && (
        <div>
          <Input
            id="user-new-post-desc"
            label="Enter your text"
            type={"text"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Input
            type={"file"}
            id="user-new-post-image"
            label="Profile Image"
            onChange={(e) => setProfileImage(e.currentTarget.files![0])}
          />
          <button onClick={sendNewPostHandler}>add</button>
        </div>
      )}

      {/*@ts-ignore*/}
      {posts && show && loadingPosts && !showAddedPost && posts.map((m) => {
          return <div key={m._id}>
            {m.desc}
            {m.img && <img src={m.img} alt={"image-post"}/>}
          </div>;
        })}

      <ErrorSnackbar />
    </Wrapper>
  );
};
