import React, { useEffect, useState } from "react";
import { changeInitialized } from "../../bll/reducer/appReducer";
import { useDispatch, useSelector } from "react-redux";
import { setUserFriendsTC } from "../../bll/reducer/usersReducer";
import { getCurrentUserId } from "../../utils/getCurrentUserId";
import {
  selectIsLoggedIn,
  selectIsMessage,
  selectStatus,
  selectUsersAll,
} from "../../bll/selector/selectors";
import { ContactsWrapper, Wrapper } from "../contactsPage/styles/styles";
import { SearchInput } from "../../components/common/searchInput/styles";
import { ErrorSnackbar } from "../../components/errorSnackbar/ErrorSnackbar";
import { Spinner } from "../../components/spinner/spinner";
import { routes } from "../../bll/routes/routes";
import { Navigate } from "react-router-dom";
import { Message } from "./message/Message";
import { setAllUsersTC } from "../../bll/reducer/usersReducer"
import { searchByNameUserTC } from "../../bll/reducer/usersReducer"

export const Messenger = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const currentUserId = getCurrentUserId();
  const usersAll = useSelector(selectUsersAll);
  const isMesage = useSelector(selectIsMessage);
  const status = useSelector(selectStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(setUserFriendsTC(currentUserId));
    dispatch(changeInitialized(false));
  }, []);

  const searchByName = () => {
    input.length === 0
      ? dispatch(setAllUsersTC(currentUserId))
      : dispatch(searchByNameUserTC(input));
  };

  if (!isLoggedIn) return <Navigate to={routes.login} />;
  if (status === "loading") return <Spinner />;
  if (!isMesage) return <Spinner />;

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
            return <Message contact={c} key={c._id} />
          })}
      </ContactsWrapper>
      <ErrorSnackbar />
    </Wrapper>
  );
};
