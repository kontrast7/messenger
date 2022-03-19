import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "../../bll/routes/routes";
import { Login } from "../../pages/auth/login/Login";
import { Register } from "../../pages/auth/register/Register";
import { ContactsPage } from "../../pages/contactsPage/ContactsPage";
import { ProfilePage } from "../../pages/profilePage/ProfilePage";
import { ChatPage } from "../../pages/chatPage/ChatPage";
import { PageNotFound } from "../../pages/pageNotFound/PageNotFound";
import { UserSettings } from "../../pages/userSettings/UserSettings";

export const PageHolder = () => {
  return (
    <section>
      <Routes>
        <Route path={routes.home} element={<h1>Home page</h1>} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Register />} />
        <Route path={routes.contacts} element={<ContactsPage />} />
        <Route path={routes.pageNotFound} element={<PageNotFound />} />
        <Route path={routes.profilePage} element={<ProfilePage />} />
        <Route path={routes.chatPage} element={<ChatPage />} />
        <Route path={routes.editProfile} element={<UserSettings />} />
        <Route path={"/*"} element={<Navigate to={"/404"} />} />
      </Routes>
    </section>
  );
};
