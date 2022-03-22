import React, { useEffect } from "react";
import { getCurrentUser, getCurrentUserId } from "../../utils/getCurrentUserId";
import { useDispatch, useSelector } from "react-redux";
import { getPostsTapeTC } from "../../bll/reducer/postsReducer";
import {
  selectCurrentUserPosts,
  selectUsersAll,
} from "../../bll/selector/selectors";
import { Username } from "../contactsPage/contact/styles/styles";
import { setUserFriendsTC } from "../../bll/reducer/usersReducer";

export const PostsTape = () => {
  const currentUserId = getCurrentUserId();
  const dispatch = useDispatch();
  const posts = useSelector(selectCurrentUserPosts);
  const users = useSelector(selectUsersAll);
  const currentUserLs = getCurrentUser();

  useEffect(() => {
    currentUserId && dispatch(getPostsTapeTC(currentUserId));
    dispatch(setUserFriendsTC(currentUserId));
  }, []);

  return (
    <div>
      {/*//@ts-ignore*/}
      {posts && posts.map((p) => {
          const us = users.find((u) => {
            return u._id === p.userId && u;
          });
          return (
            <div key={p._id} style={{ backgroundColor: "gray" }}>
              {us ? (
                <Username to={`/user/${p.userId}`}>
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                    src={us.profilePicture}
                  />
                </Username>
              ) : (
                <Username to={`/user/${p.userId}`}>
                  <img
                    style={{ width: "100px", borderRadius: "50%" }}
                    src={currentUserLs.profilePicture}
                  />
                </Username>
              )}

              <div>{p.desc}</div>
              {p.img && <img src={p.img} alt={"img-post"} />}
            </div>
          );
        })}
    </div>
  );
};
