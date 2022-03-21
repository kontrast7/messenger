import React from "react";
import "./App.css";
import { Header } from "./components/header/Header";
import { PageHolder } from "./components/pageholder/PageHolder";
import { ThemeProvider } from "styled-components";
import light from "./styles/theme/light";
import dark from "./styles/theme/dark";
import { GlobalStyles } from "./styles/global";
import { Navigation } from "./components/navigaton/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectTheme } from "./bll/selector/selectors";
import { PageWrapper } from "./styles/global";
import { changeTheme } from "./utils/changeTheme";

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const themeState = useSelector(selectTheme);
  return (
    <ThemeProvider
      theme={localStorage.getItem("theme") === "dark" ? dark : light}
    >
      <PageWrapper>
        <GlobalStyles />
        <Header />
        <PageHolder />
        {/*<button onClick={() => changeTheme(themeState, dispatch)}>*/}
        {/*  Change*/}
        {/*</button>*/}
        {isLoggedIn && <Navigation />}
      </PageWrapper>
    </ThemeProvider>
  );
}

export default App;
