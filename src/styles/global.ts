import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,*::before,*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
  }
  
  body {
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    color: ${({ theme }) => theme.colors.mainText};
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Container = styled.div`
  max-width: 500px;
  padding: 0 1.375rem;
  margin: 0 auto;
`;

export const Avatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  filter: drop-shadow(20px 24px 34px rgba(0, 0, 0, 0.45));
`;
