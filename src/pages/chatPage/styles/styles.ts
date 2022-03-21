import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

export const Wrapper = styled.div`
  height: calc(100vh - 150px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 2rem;
  word-break: break-all;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ControlPanel = styled.div`
  display: flex;
  align-items: end;
  max-height: 135px;
  gap: 15px;
  margin: 1rem 0;
`;

export const ChatLog = styled(TextareaAutosize)`
  width: 100%;
  background-color: #00000040;
  padding: 12px 15px;
  outline: none;
  resize: none;
  border: none;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.inputColor};
  font-size: 0.875rem;
  line-height: 1rem;
  letter-spacing: 1px;

  ::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const SendMessage = styled.button`
  width: 45px;
  height: 40px;
  border-radius: 10px;
  background-color: #837dff;
  border: none;

  img {
    width: 25px;
    height: 25px;
  }
`;
