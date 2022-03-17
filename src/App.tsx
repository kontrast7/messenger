import React, { useEffect } from "react";
import "./App.css";
import { usersApi } from "./api/api";
import { Header } from "./components/header/Header";
import { Routes } from "react-router-dom";
import { PageHolder } from "./components/pageholder/PageHolder";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    usersApi
      .getAllUsers("62332a59d327af0023f7dfcf")
      .then((res) => console.log(JSON.stringify(res)));
  }, []);

  return (
    <Routes>
      <div className="App">
        {!isLoggedIn && <Header />}
        <PageHolder />
      </div>
    </Routes>
  );
}

export default App;
