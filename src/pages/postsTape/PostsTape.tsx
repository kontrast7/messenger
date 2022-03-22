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
import defaultUserIcon from "../../assets/images/icons/default-user-icon.svg";
import { CreatedInfo } from "./post/styles/styles";
import { CreatedBy } from "./post/styles/styles";
import { selectIsLoggedIn } from "../../bll/selector/selectors";
import { routes } from "../../bll/routes/routes"

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

  if (!isLoggedIn) return <Navigate to={routes.login} />;

  return (
    <Wrapper>
      {/*//@ts-ignore*/}
      {posts && posts.map((p) => {
          const us = users.find((u) => {
            return u._id === p.userId && u;
          });
          return (
            <Post key={p._id}>
              {us ? (
                <Username to={`/user/${p.userId}`}>
                  <InfoWrapper>
                    <Avatar src={us.profilePicture} alt={"Avatar Icon"} />
                    <CreatedInfo>
                      <CratedDate>Created: 12.00</CratedDate>
                      <CreatedBy>Created by: Makss</CreatedBy>
                    </CreatedInfo>
                  </InfoWrapper>
                </Username>
              ) : (
                <Username to={`/user/${p.userId}`}>
                  <InfoWrapper>
                    <Avatar
                      src={
                        currentUserLs.profilePicture
                          ? currentUserLs.profilePicture
                          : defaultUserIcon
                      }
                      alt={"Avatar Icon"}
                    />
                    <CreatedInfo>
                      <CratedDate>Created: 12.00</CratedDate>
                      <CreatedBy>Created by: Makss</CreatedBy>
                    </CreatedInfo>
                  </InfoWrapper>
                </Username>
              )}

              <Description>{p.desc}</Description>
              {p.img && <PostImage src={p.img} alt={"img-post"} />}
            </Post>
          );
        })}
    </Wrapper>
  );
};
