import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  followUnFollowUserTC,
  setCurrentProfileTC,
} from "../../bll/reducer/usersReducer";
import { selectUsersAll } from "../../bll/selector/selectors";
import { Spinner } from "../../components/spinner/spinner";
import { ErrorSnackbar } from "../../components/errorSnackbar/ErrorSnackbar";
import { getCurrentUserId } from "../../utils/getCurrentUserId";
import { Link } from "react-router-dom";
import { routes } from "../../bll/routes/routes";
import { createChatRoomTC } from "../../bll/reducer/roomsReducer";
import { Follow, GoToMessages } from "../contactsPage/contact/styles/styles";
//@ts-ignore
import messageIcon from "../../assets/images/icons/message-icon.svg";

export const ProfilePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const users = useSelector(selectUsersAll);

  const currentUserId = getCurrentUserId();

  useEffect(() => {
    id && dispatch(setCurrentProfileTC(id));
  }, []);

  const followUserHandler = (id: string, action: "follow" | "unfollow") => {
    dispatch(followUnFollowUserTC(id, action, currentUserId));

    if (action === "follow") {
      dispatch(createChatRoomTC({ id, currentUserId }));
    }
  };

  const user = users.filter((u) => u._id === id)[0];

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

      {id === currentUserId ? (
        <Link to={routes.editProfile}>Edit Profile</Link>
      ) : (
        <>
          <GoToMessages to={`/chat/${currentUserId}/${user._id}`}>
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
        </>
      )}

      <ErrorSnackbar />
    </section>
  );
};
