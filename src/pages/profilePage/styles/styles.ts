import styled from "styled-components";
import { Link } from "react-router-dom";
import { Follow } from "../../contactsPage/contact/styles/styles";
import React from "react";

export const Wrapper = styled.section`
  padding-top: 7%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 190px;
  height: 190px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5em;
`;

export const UserName = styled.h1`
  letter-spacing: 1px;
  text-transform: capitalize;
  font-size: 1.4rem;
  line-height: 32px;
  margin-bottom: 0.7em;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 1rem;

  button {
    width: 43%;
  }

  a {
    width: 43%;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  justify-self: start;
  flex-direction: column;
  gap: 0.5em;
  margin: 7% 0;
  width: 90%;
`;

export const Description = styled.p``;

export const Email = styled.p``;

export const City = styled.p``;

export const ShowPosts = styled(Follow)`
  width: 90%;
`;

export const EditProfile = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
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