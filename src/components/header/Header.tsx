import React from "react";
import { Wrapper, Inner, Logo } from "./styles/styles";
//@ts-ignore
import logo from "../../assets/images/icons/white-logo.svg";
import { Link } from "react-router-dom";
import { routes } from "../../bll/routes/routes";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../bll/selector/selectors";
import { ExitIcons } from "../navigaton/styles/styles";
import { Avatar } from "../navigaton/styles/styles";
//@ts-ignore
import exitIcon from "../../assets/images/icons/logout.svg";
import { setIsLoggedInAC } from "../../bll/reducer/appReducer";
import { useDispatch } from "react-redux";

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.removeItem("user");
    dispatch(setIsLoggedInAC(false));
  };

  return (
    <Wrapper>
      <Inner>
        {isLoggedIn ? (
          <Link to={routes.postsTape}>
            <Logo src={logo} alt="Logotype" />
          </Link>
        ) : (
          <Logo src={logo} alt="Logotype" />
        )}
        {isLoggedIn && (
          <ExitIcons onClick={logoutHandler}>
            <Avatar src={exitIcon} alt="Exit page" />
          </ExitIcons>
        )}
      </Inner>
    </Wrapper>
  );
};
