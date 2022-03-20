import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.section`
  height: 100vh;
`;

export const Inner = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const LoginButton = styled.button`
  padding: 0.6rem 2.5rem;
  border: 2px solid ${({ theme }) => theme.colors.inputColor};
  color: ${({ theme }) => theme.colors.inputColor};
  background: transparent;
  font-size: ${({ theme }) => theme.fontSize.contactName};
  font-weight: bold;
  margin-top: .5rem;
  cursor: pointer;
`;

export const DontHaveAccount = styled.p`
  display: flex;
  gap: 0.5em;
  margin-top: 1rem;
  align-items: center;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSize.contactName};
  color: ${({ theme }) => theme.colors.inputColor};
`;

export const DontHaveAccountLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.contactName};
  color: ${({ theme }) => theme.colors.accentColor};
  text-decoration: underline;
`;
