import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import React from "react";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Content = styled.div`
  display: flex;
  gap: 21px;
  cursor: pointer;
`;

export const PostInner = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8em;
  letter-spacing: 1px;
`;

export const Username = styled(Link)`
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.inputColor};
  font-size: ${({ theme }) => theme.fontSize.contactName};
  line-height: 1.125rem;
  margin-top: 1px;
  display: flex;
  align-items: center;
  gap: .7rem;
`;

export const GoToMessages = styled(Link)<GoToMessagesPropsType>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.secondaryAccentColor};
  border-radius: 10px;
  border: none;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "fill")};
  opacity: ${({ disabled }) => (disabled ? ".5" : "1")};

  img {
    width: 27px;
  }
`;

export const Follow = styled.button`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.accentColor};
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.inputColor};
  font-size: 1.25rem;
  line-height: 1.437rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.colors.accentColor};
    opacity: 0.9;
  }
`;

// Types

type GoToMessagesPropsType = {
  disabled?: boolean;
};
