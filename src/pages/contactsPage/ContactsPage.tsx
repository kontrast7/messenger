import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchByNameUserTC,
  setAllUsersTC,
} from "../../bll/reducer/usersReducer";
import { Contact } from "./contact/Contact";
import {
  selectIsInitialized,
  selectUsersAll,
} from "../../bll/selector/selectors";
import { Spinner } from "../../components/spinner/spinner";
import { selectStatus } from "../../bll/selector/selectors";
import { ErrorSnackbar } from "../../components/errorSnackbar/ErrorSnackbar";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../bll/selector/selectors";
import { getCurrentUserId } from "../../utils/getCurrentUserId";
import { routes } from "../../bll/routes/routes";
import { SearchInput } from "../../components/common/searchInput/styles";
import { ContactsWrapper } from "./styles/styles";
import { Wrapper } from "./styles/styles";
import { setIsMessageAC } from "../../bll/reducer/appReducer";
import { onEnterPress } from "../../utils/onEnter";
import { NoDataPlaceholder } from "./styles/styles"

export const ContactsPage = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [input, setInput] = useState("");
  const currentUserId = getCurrentUserId();
  const usersAll = useSelector(selectUsersAll);
  const isInitialized = useSelector(selectIsInitialized);

  useEffect(() => {
    isLoggedIn && dispatch(setAllUsersTC(currentUserId));
    dispatch(setIsMessageAC(false));
  }, []);

  const searchByName = () => {
    input.length === 0
      ? dispatch(setAllUsersTC(currentUserId))
      : dispatch(searchByNameUserTC(input));
  };

  if (!isLoggedIn) return <Navigate to={routes.login} />;
  if (status === "loading") return <Spinner />;
  if (!isInitialized) return <Spinner />;

  return (
    <Wrapper>
      <SearchInput
        onKeyPress={(e) => onEnterPress(e, searchByName)}
        placeholder={"Search..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onClick={searchByName}
      />
      <ContactsWrapper>
        {usersAll &&
          usersAll.map((c) => {
            return <Contact key={c._id} contact={c} />;
          })}
        {usersAll.length === 0 && <NoDataPlaceholder>Sorry no contacts was found...</NoDataPlaceholder>}
      </ContactsWrapper>
      <ErrorSnackbar />
    </Wrapper>
  );
};
