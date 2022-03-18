import { createGlobalStyle } from "styled-components";

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
