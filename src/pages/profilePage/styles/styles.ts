import styled from "styled-components";
import { Link } from "react-router-dom";
import { Follow } from "../../contactsPage/contact/styles/styles";

export const Wrapper = styled.section`
  padding-top: 7%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 50%;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: .5em;
`;

export const UserName = styled.h1`
  letter-spacing: 1px;
  text-transform: capitalize;
  font-size: 1.4rem;
  line-height: 32px;
  margin-bottom: 2em;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 2.5rem;

  button {
    width: 80px;
  }

  a {
    width: 80px;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  margin: 7% 0;
`;

export const Description = styled.p``;

export const Email = styled.p``;

export const City = styled.p``;

export const ShowPosts = styled(Follow)`
  width: 70%;
`;

export const EditProfile = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.secondaryAccentColor};
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.inputColor};
  font-size: 1.25rem;
  line-height: 1.437rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;
