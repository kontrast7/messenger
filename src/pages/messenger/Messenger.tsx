import React, { useEffect, useState } from "react";
import { changeInitialized } from "../../bll/reducer/appReducer";
import { useDispatch, useSelector } from "react-redux";
import { setUserFriendsTC } from "../../bll/reducer/usersReducer";
import { getCurrentUserId } from "../../utils/getCurrentUserId";
import {
  selectIsInitialized,
  selectIsLoggedIn,
  selectStatus,
  selectUsersAll,
} from "../../bll/selector/selectors";
import { ContactsWrapper, Wrapper } from "../contactsPage/styles/styles";
import { SearchInput } from "../../components/common/searchInput/styles";
import { ErrorSnackbar } from "../../components/errorSnackbar/ErrorSnackbar";
import { Spinner } from "../../components/spinner/spinner";
import { routes } from "../../bll/routes/routes";
import { Navigate } from "react-router-dom";

export const Messenger = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const getUserId = getCurrentUserId();
  const usersAll = useSelector(selectUsersAll);

  const status = useSelector(selectStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(setUserFriendsTC(getUserId));
    dispatch(changeInitialized(false));
  }, []);

  const searchByName = () => {};

  if (!isLoggedIn) return <Navigate to={routes.login} />;
  if (status === "loading") return <Spinner />;

  return (
    <Wrapper>
      <SearchInput
        placeholder={"Search..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onClick={searchByName}
      />
      <ContactsWrapper>
        {usersAll &&
          usersAll.map((c) => {
            return <div key={c._id}>{c.username}</div>;
          })}
      </ContactsWrapper>
      <ErrorSnackbar />
    </Wrapper>
  );
};
