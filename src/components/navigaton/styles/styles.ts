import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 55px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.navigateColor};
`;

export const NavigationIcons = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;

  :first-child img {
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const ExitIcons = styled.button`
  position: absolute;
  right: 0;
  top: 45%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border: none;
  background: transparent;

  img {
    border-radius: unset;
    max-width: 100%;
    max-height: 100%;
  }
`;

export const Avatar = styled.img`
  width: 45px;
  height: 45px;
  object-fit: cover;
  line-height: 0;
  font-size: 0;
  border-radius: 50%;

  :active {
    transform: scale(0.9);
  }
`;
