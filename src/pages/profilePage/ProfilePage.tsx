import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  followUnFollowUserTC,
  setCurrentProfileTC,
} from "../../bll/reducer/usersReducer";
import { selectUsersAll } from "../../bll/selector/selectors";
import { Spinner } from "../../components/spinner/spinner";

export const ProfilePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const users = useSelector(selectUsersAll)[0];
  const currentUserId = JSON.parse(localStorage.getItem("user") as string)._id;

  useEffect(() => {
    id && dispatch(setCurrentProfileTC(id));
  }, []);

  const followUserHandler = (id: string, action: "follow" | "unfollow") => {
    dispatch(followUnFollowUserTC(id, action, currentUserId));
  };

  if (!users) return <Spinner />;

  return (
    <section>
      {users.username}
      <img
        style={{ width: "100px" }}
        src={
          users.profilePicture
            ? users.profilePicture
            : "https://ru-static.z-dn.net/files/dba/092be1b0626a7a1af16f540c105576cd.jpeg"
        }
      />
      {users.followers.includes(currentUserId) ? (
        <button onClick={() => followUserHandler(users._id, "unfollow")}>
          unfollow
        </button>
      ) : (
        <button onClick={() => followUserHandler(users._id, "follow")}>
          follow
        </button>
      )}
    </section>
  );
};
