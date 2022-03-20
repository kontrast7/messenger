import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Content = styled.div`
  display: flex;
  gap: 21px;
`;

export const Username = styled(Link)`
  letter-spacing: 1px;
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.inputColor};
  font-size: ${({ theme }) => theme.fontSize.contactName};
  line-height: 1.125rem;
  margin-top: 1px;
`;

export const GoToMessages = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.secondaryAccentColor};
  border-radius: 10px;
  border: none;

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
`;
