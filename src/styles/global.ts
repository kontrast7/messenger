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

export const Container = styled.div`
  max-width: 500px;
  padding: 0 1rem;
  margin: 0 auto;
`;
