import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
  height: calc(100vh - 131px);
  overflow-x: hidden;
  overflow-y: scroll;
  
  ::-webkit-scrollbar {
    display: none;
  }
`;
