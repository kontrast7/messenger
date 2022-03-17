import React, { useEffect } from "react";
import "./App.css";
import { usersApi } from "./api/api";
import { Header } from "./components/header/Header";
import { PageHolder } from "./components/pageholder/PageHolder";
import { useState } from "react";
import { Register } from "./pages/auth/register/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    usersApi
      .getAllUsers("62332a59d327af0023f7dfcf")
      .then((res) => console.log(JSON.stringify(res)));
  }, []);

  return (
    <div className="App">
      {!isLoggedIn && <Header />}
      <PageHolder />
      <Register />
    </div>
  );
}

export default App;
