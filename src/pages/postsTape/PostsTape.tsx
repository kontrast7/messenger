import React, { useEffect } from "react";
import { getCurrentUser, getCurrentUserId } from "../../utils/getCurrentUserId";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentUserPosts,
  selectUsersAll,
} from "../../bll/selector/selectors";
import { Navigate } from "react-router-dom";
import { Username } from "../contactsPage/contact/styles/styles";
import { setUserFriendsTC } from "../../bll/reducer/usersReducer";
import { getPostsTapeTC } from "../../bll/reducer/postsReducer";
import { Wrapper } from "./styles/styles";
import { Post } from "./post/Post";
import { Avatar } from "../../components/navigaton/styles/styles";
import {
  PostImage,
  CratedDate,
  InfoWrapper,
  Description,
} from "./post/styles/styles";
//@ts-ignore
import defaultUserIcon from "../../assets/images/icons/default-user-icon-black.svg";
import { CreatedInfo } from "./post/styles/styles";
import { CreatedBy } from "./post/styles/styles";
import { selectIsLoggedIn } from "../../bll/selector/selectors";
import { routes } from "../../bll/routes/routes";
import { dayMonthYearDateParse } from "../../utils/parseDate";
import { NoDataPlaceholder } from "../contactsPage/styles/styles"
import { reactOnPost } from "../../bll/reducer/postsReducer"
// @ts-ignore
import lightLike from "../../assets/images/icons/like-red-icon.svg"
// @ts-ignore
import darkLike from "../../assets/images/icons/like-dark-icon.svg"
import { PostInner } from "../contactsPage/contact/styles/styles"
import { Like } from "../profilePage/post/styles/styles"
import { LikeIcon } from "../profilePage/post/styles/styles"
// @ts-ignore
import likeLike from "../../assets/images/icons/like-red-icon.svg"
import { LikeWrapper } from "../profilePage/post/styles/styles"
import { AvatarLink } from "../../components/navigaton/styles/styles"


export const PostsTape = () => {
  const currentUserId = getCurrentUserId();
  const dispatch = useDispatch();
  const posts = useSelector(selectCurrentUserPosts);
  const users = useSelector(selectUsersAll);
  const currentUserLs = getCurrentUser();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    currentUserId && dispatch(getPostsTapeTC(currentUserId));
    dispatch(setUserFriendsTC(currentUserId));
  }, []);

  const likePostHandler = (postId: string) => {
    dispatch(reactOnPost(postId, currentUserId));
  };


  if (!isLoggedIn) return <Navigate to={routes.login} />;

  return (
    <Wrapper>
      {/*//@ts-ignore*/}
      {posts && posts.map((p) => {
          const us = users.find((u) => {
            return u._id === p.userId && u;
          });
        const myLike = p.likes.find((likeId: string) => likeId === currentUserId);

        return (
            <Post key={p._id}>
              {us ? (
                <PostInner >
                  <InfoWrapper>
                    <AvatarLink to={`/user/${currentUserId}`}>
                    <Avatar
                      src={
                        us.profilePicture ? us.profilePicture : defaultUserIcon
                      }
                      alt={"Avatar Icon"}
                    />
                    </AvatarLink>
                    <CreatedInfo>
                      <CratedDate>
                        Created: {dayMonthYearDateParse(p.updatedAt)}
                      </CratedDate>
                      <CreatedBy>Created by: {us.username}</CreatedBy>
                    </CreatedInfo>
                  </InfoWrapper>
                </PostInner>
              ) : (
                  <InfoWrapper>
                    {/*//@ts-ignore*/}
                    <AvatarLink to={`/user/${us.userId}`}>
                    <Avatar
                      src={
                        currentUserLs.profilePicture
                          ? currentUserLs.profilePicture
                          : defaultUserIcon
                      }
                      alt={"Avatar Icon"}
                    />
                    </AvatarLink>
                    <CreatedInfo>
                      <CratedDate>
                        Created: {dayMonthYearDateParse(p.updatedAt)}
                      </CratedDate>
                      <CreatedBy>
                        Created by: {currentUserLs && currentUserLs.username}
                      </CreatedBy>
                      <LikeWrapper>
                        <Like>Likes: {p.likes.length}</Like>
                        <Like>
                          <LikeIcon
                            onClick={() => likePostHandler(p._id)}
                            src={myLike ? likeLike : darkLike}
                            alt="Like / Unlike"
                          />
                        </Like>
                      </LikeWrapper>
                    </CreatedInfo>
                  </InfoWrapper>
              )}

              <Description>{p.desc}</Description>
              {p.img && <PostImage src={p.img} alt={"img-post"} />}
            </Post>
          );
        })}
      {/*@ts-ignore*/}
      {posts.length === 0 && <NoDataPlaceholder>No post's was found...</NoDataPlaceholder>}
    </Wrapper>
  );
};
