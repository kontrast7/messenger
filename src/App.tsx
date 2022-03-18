import React, { useEffect } from "react";
import "./App.css";
import { usersApi } from "./api/api";
import { Header } from "./components/header/Header";
import { PageHolder } from "./components/pageholder/PageHolder";
import { useState } from "react";
import { Login } from "./pages/auth/login/Login";
import { Register } from "./pages/auth/register/Register";
import { UsersList } from "./pages/usersList/usersList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {!isLoggedIn && <Header />}

      <PageHolder />
      {/*<div>Login</div>*/}
      {/*<Login />*/}
      {/*<div>Register</div>*/}
      {/*<Register />*/}
      <div>UsersList</div>
      <UsersList />
    </>
  );
}

export default App;
