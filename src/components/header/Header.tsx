import React from "react";
import { Wrapper, Inner, Logo } from "./styles/styles";
import { Container } from "../../styles/global";
//@ts-ignore
import logo from "../../assets/images/icons/white-logo.svg";
import { Link } from "react-router-dom";
import { routes } from "../../bll/routes/routes";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../bll/selector/selectors";

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Wrapper>
      <Container>
        <Inner>
          {isLoggedIn ? (
            <Link to={routes.postsTape}>
              <Logo src={logo} alt="Logotype" />
            </Link>
          ) : (
            <Logo src={logo} alt="Logotype" />
          )}
        </Inner>
      </Container>
    </Wrapper>
  );
};
