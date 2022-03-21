import React from "react";
import { Wrapper, Inner, Logo } from "./styles/styles";
import { Container } from "../../styles/global";
//@ts-ignore
import logo from "../../assets/images/icons/white-logo.svg";

export const Header = () => {
  return (
    <Wrapper>
      <Container>
        <Inner>
          <Logo src={logo} alt="Logotype" />

        </Inner>
      </Container>
    </Wrapper>
  );
};
