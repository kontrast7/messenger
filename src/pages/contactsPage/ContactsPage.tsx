import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchByNameUserTC,
  setAllUsersTC,
} from "../../bll/reducer/usersReducer";
import { Contact } from "./contact/Contact";
import { selectUsersAll } from "../../bll/selector/selectors";
import { Spinner } from "../../components/spinner/spinner";
import { selectStatus } from "../../bll/selector/selectors";
import { ErrorSnackbar } from "../../components/errorSnackbar/ErrorSnackbar";

export const ContactsPage = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const currentUserId = JSON.parse(localStorage.getItem("user") as string)._id;
  const usersAll = useSelector(selectUsersAll);
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(setAllUsersTC(currentUserId));
  }, []);

  const searchByName = () => {
    input.length === 0
      ? dispatch(setAllUsersTC(currentUserId))
      : dispatch(searchByNameUserTC(input));
  };

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <div>
      <input
        value={input}
        placeholder={"enter to search"}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={searchByName}>Search</button>
      {usersAll &&
        usersAll.map((c) => {
          return <Contact key={c._id} contact={c} />;
        })}
      <ErrorSnackbar />
    </div>
  );
};
