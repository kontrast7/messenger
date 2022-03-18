import React from "react";
import "./App.css";
import { Header } from "./components/header/Header";
import { PageHolder } from "./components/pageholder/PageHolder";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import light from "./styles/theme/light";
import dark from "./styles/theme/dark";
import { GlobalStyles } from "./styles/global";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectTheme } from "./bll/selector/selectors";
import { changeTheme } from "./utils/changeTheme";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  return (
    <ThemeProvider
      theme={localStorage.getItem("theme") === "dark" ? dark : light}
    >
      <GlobalStyles />
      {!isLoggedIn && <Header />}
      <PageHolder />
      <button onClick={() => changeTheme(theme, dispatch)}>ChangeTheme</button>
    </ThemeProvider>
  );
}

export default App;
