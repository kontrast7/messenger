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
//@ts-ignore
import messageIcon from "../../assets/images/icons/message-icon.svg";
//@ts-ignore
import defaultUserIcon from "../../assets/images/icons/default-user-icon.svg";
import { Inner } from "../postsTape/post/styles/styles";
import { ProfileChatLog } from "./styles/styles";
import { Post } from "./post/Post";
import { PostsWrapper } from "./styles/styles"

export const ProfilePage = () => {
  const [show, setShow] = useState(false);
  const [showAddedPost, setShowAddedPost] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [profileImage, setProfileImage] = useState<Blob>();
  const [buttonClickId, setButtonClickId] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const users = useSelector(selectUsersAll);
  const loadingPosts = useSelector(selectIsLoadingPosts);
  const posts = useSelector(selectCurrentUserPosts);
  const currentUserId = getCurrentUserId();
  const user = users.filter((u) => u._id === id)[0];

  useEffect(() => {
    id && dispatch(setCurrentProfileTC(id));
    dispatch(changeInitialized(false));
    dispatch(setIsLoadingPosts(false));
    dispatch(setIsMessageAC(false));
    setShow(false);
  }, [id]);

  const followUserHandler = (id: string, action: "follow" | "unfollow") => {
    dispatch(followUnFollowUserTC(id, action, currentUserId));

    if (action === "follow") {
      dispatch(createChatRoomTC({ id, currentUserId }));
    }
  };
  const showPostsHandler = () => {
    user && dispatch(getAllPostsUser(user.username));
    setShow(!show);
    setShowAddedPost(false);
    setShowEditPost(false);
  };
  const showAddedPostsHandler = () => {
    setShowAddedPost(!showAddedPost);
    setShow(false);
    setShowEditPost(false);
  };
  const sendNewPostHandler = () => {
    const payload: createNewPostsType = {
      userId: currentUserId,
      desc: inputValue,
    };
    profileImage && (payload.img = profileImage);
    dispatch(sendNewPostTC(payload));
    setInputValue("");
    setProfileImage(undefined);
    setShowAddedPost(false);
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

      <ButtonWrapper>
        <ShowPosts onClick={showPostsHandler}>Show Posts</ShowPosts>

        {id === currentUserId && (
          <ShowPosts onClick={showAddedPostsHandler}>Add Post</ShowPosts>
        )}
      </ButtonWrapper>
      {id === currentUserId && showAddedPost && !show && (
        <Inner style={{ margin: "1rem 0" }}>
          <ProfileChatLog
            id="user-new-post-desc"
            placeholder={"Enter new post"}
            maxRows={5}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <input
            type={"file"}
            id="user-new-post-image"
            onChange={(e) => setProfileImage(e.currentTarget.files![0])}
          />
          <button onClick={sendNewPostHandler}>add</button>
        </Inner>
      )}

      <PostsWrapper>
        {/*@ts-ignore*/}
        {posts && show && loadingPosts && !showAddedPost && posts.map((m) => {
          return (
            <Post
              key={m._id}
              m={m}
              showEditPost={showEditPost}
              setShowEditPost={setShowEditPost}
              inputValue={inputValue}
              buttonClickId={buttonClickId}
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              setInputValue={setInputValue}
              setButtonClickId={setButtonClickId}
            />
          );
        })}
      </PostsWrapper>

      <ErrorSnackbar />
    </Wrapper>
  );
};
