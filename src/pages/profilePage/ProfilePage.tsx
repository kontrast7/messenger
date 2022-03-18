import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  followUnFollowUserTC,
  setCurrentProfileTC,
} from "../../bll/reducer/usersReducer";
import { selectUsersAll } from "../../bll/selector/selectors";
import { changeInitialized } from "../../bll/reducer/appReducer";
import { Spinner } from "../../components/spinner/spinner";
import { createChatRoomTC } from "../../bll/reducer/roomsReducer";
import { Link } from "react-router-dom";

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

  if (!user) return <Spinner />;

  return (
    <section>
      {user.username}
      <img
        style={{ width: "35%", borderRadius: "50%", backgroundSize: "fill" }}
        src={
          user.profilePicture
            ? user.profilePicture
            : "https://pbs.twimg.com/media/E2xsCwOXEAg5-pK.png"
        }
        alt={"photo"}
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
