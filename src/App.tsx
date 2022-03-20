import React from "react";
import "./App.css";
import { Header } from "./components/header/Header";
import { PageHolder } from "./components/pageholder/PageHolder";
import { ThemeProvider } from "styled-components";
import light from "./styles/theme/light";
import dark from "./styles/theme/dark";
import { GlobalStyles } from "./styles/global";
import { Navigation } from "./components/navigaton/Navigation";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "./bll/selector/selectors";
import { PageWrapper } from "./styles/global";

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <ThemeProvider
      theme={localStorage.getItem("theme") === "dark" ? dark : light}
    >
      <PageWrapper>
        <GlobalStyles />
        <Header />
        <PageHolder />
        {isLoggedIn && <Navigation />}
      </PageWrapper>
    </ThemeProvider>
  );
}

export default App;
