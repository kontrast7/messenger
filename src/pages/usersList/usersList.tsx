import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followUnFollowUserTC,
  searchByNameUserTC,
  setAllUsersTC,
} from "../../bll/redcuer/usersReducer";
import { RootAppStateType } from "../../bll/redux/store";

export const UsersList = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const currentUserId = JSON.parse(localStorage.getItem("user") as string)._id;

  const usersAll = useSelector<RootAppStateType>((state) => state.users);

  useEffect(() => {
    dispatch(setAllUsersTC(currentUserId));
  }, []);

  const followUserHandler = (id: string, action: "follow" | "unfollow") => {
    dispatch(followUnFollowUserTC(id, action, currentUserId));
  };
  const searchByName = () => {
    input.length === 0
      ? dispatch(setAllUsersTC(currentUserId))
      : dispatch(searchByNameUserTC(input));
  };

  return (
    <div>
      <input
        value={input}
        placeholder={"enter to search"}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={searchByName}>Search</button>
      {/*// @ts-ignore*/}
      {usersAll && usersAll.map((m) => {
          return (
            <div key={m._id}>
              {m.username}

              {m.followers.includes(currentUserId) ? (
                <button onClick={() => followUserHandler(m._id, "unfollow")}>
                  unfollow
                </button>
              ) : (
                <button onClick={() => followUserHandler(m._id, "follow")}>
                  follow
                </button>
              )}
            </div>
          );
        })}
    </div>
  );
};
