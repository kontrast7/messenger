import { Wrapper } from "../contactsPage/styles/styles";
import { SearchInput } from "../../components/common/searchInput/styles";
import { onEnterPress } from "../../utils/onEnter";
import { ContactsWrapper } from "../contactsPage/styles/styles";
import { ErrorSnackbar } from "../../components/errorSnackbar/ErrorSnackbar";
import React from "react";
import { useState } from "react";
import { setUserFriendsTC } from "../../bll/reducer/usersReducer";
import { searchByNameUserTC } from "../../bll/reducer/usersReducer";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../utils/getCurrentUserId";
import { useEffect } from "react";
import { setAllUsersTC } from "../../bll/reducer/usersReducer";
import { useSelector } from "react-redux";
import { selectUsersAll } from "../../bll/selector/selectors";
import { Contact } from "../contactsPage/contact/Contact"
import { initStatePropsType } from "../../bll/reducer/usersReducer"
import { getCurrentUserId } from "../../utils/getCurrentUserId"

export const Followers = () => {
  const [input, setInput] = useState("");
  const currentUser = getCurrentUser();
  const currentUserId = getCurrentUserId()
  const dispatch = useDispatch();
  const followers = currentUser.followers;
  const allUsers = useSelector(selectUsersAll);

  useEffect(() => {
    dispatch(setAllUsersTC(currentUser._id));
  }, []);

  const searchByName = () => {
    input.length === 0
      ? dispatch(setAllUsersTC(currentUserId))
      : dispatch(searchByNameUserTC(input));
  };

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
        {
          allUsers.map(user => {
            const item = followers.find((follower: string) => follower === user._id)

            return item && <Contact key={user._id} contact={user} />;
          })
        }
      </ContactsWrapper>
      <ErrorSnackbar />
    </Wrapper>
  );
};
