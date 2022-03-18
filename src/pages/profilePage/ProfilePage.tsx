import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  followUnFollowUserTC,
  setCurrentProfileTC,
} from "../../bll/reducer/usersReducer";
import { selectUsersAll } from "../../bll/selector/selectors";

export const ProfilePage = () => {
  const { id } = useParams();

  useEffect(() => {
    id && dispatch(setCurrentProfileTC(id));
  }, []);
  const dispatch = useDispatch();
  const user = useSelector(selectUsersAll)[0];
  const currentUserId = JSON.parse(localStorage.getItem("user") as string)._id;
   const followUserHandler = (id: string, action: "follow" | "unfollow") => {
    dispatch(followUnFollowUserTC(id, action, currentUserId));
  };

  return (
    <section>
      {user.username}
      <img
        style={{ width: "100px" }}
        src={
          user.profilePicture
            ? user.profilePicture
            : "https://ru-static.z-dn.net/files/dba/092be1b0626a7a1af16f540c105576cd.jpeg"
        }
      />
      {user.followers.includes(currentUserId) ? (
        <button onClick={() => followUserHandler(user._id, "unfollow")}>
          unfollow
        </button>
      ) : (
        <button onClick={() => followUserHandler(user._id, "follow")}>
          follow
        </button>
      )}
    </section>
  );
};
