import styled from "styled-components";

export const Wrapper = styled.div`
  height: calc(100vh - 131px);
  overflow-y: scroll;
  overflow-x: hidden;
  
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ContactsWrapper = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const NoDataPlaceholder = styled.p`
  font-size: 1.2rem;
  text-align: center;
`