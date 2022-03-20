import { Wrapper } from "./styles/styles";
import React from "react";
import { getCurrentUser } from "../../utils/getCurrentUserId";
import { Username } from "../../pages/contactsPage/contact/styles/styles";
import { Link } from "react-router-dom";
import { routes } from "../../bll/routes/routes";
import { Spinner } from "../spinner/spinner";

export const Navigation = () => {
  const currentUser = getCurrentUser();

  // if (!currentUser) return <Spinner />;
  return (
    <Wrapper>
      {/*{currentUser._id && (*/}
      {/*  <Username to={`/user/${currentUser._id}`}>*/}
      {/*    {currentUser.username}*/}
      {/*  </Username>*/}
      {/*)}*/}
      <Link to={routes.contacts}>Contacts</Link>
      <Link to={routes.messenger}>Messenger</Link>
    </Wrapper>
  );
};
