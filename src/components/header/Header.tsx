import React from "react";
import { Wrapper, Inner, Logo } from "./styles/styles";
import { Container } from "../../styles/global";
//@ts-ignore
import logo from "../../assets/images/icons/white-logo.svg";
import { Link } from "react-router-dom";
import { routes } from "../../bll/routes/routes";

export const Header = () => {
  return (
    <Wrapper>
      <Container>
        <Inner>
          <Link to={routes.postsTape}>
            <Logo src={logo} alt="Logotype" />
          </Link>
        </Inner>
      </Container>
    </Wrapper>
  );
};
