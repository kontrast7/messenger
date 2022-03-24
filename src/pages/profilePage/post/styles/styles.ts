import styled from "styled-components/macro";
import { Inner } from "../../../postsTape/post/styles/styles";
import { DeleteButton } from "../../../chatPage/chat/styles/styles";
import { Follow } from "../../../contactsPage/contact/styles/styles";
import { ChatLog } from "../../../chatPage/styles/styles";

export const Wrapper = styled(Inner)`
  position: relative;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  overflow-x: hidden;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
`;

export const DeletePost = styled(DeleteButton)`
  top: 5px;
  padding: 0.2em 0.4em;
  right: 10px;
  font-weight: bold;
`;

export const EditButton = styled(Follow)`
  min-width: 100px;
  height: 27px;
  font-size: 0.9rem;
`;

export const EditContentWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  align-items: start;
`;

export const SaveButton = styled(Follow)`
  background-color: ${({ theme }) => theme.colors.secondaryAccentColor};
  height: 23px;
  width: 55px;
  font-size: 0.8rem;
`;

export const PostInputEdit = styled(ChatLog)``;

export const MainButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: .3em;
`;

export const LikeWrapper = styled.div`
  display: flex;
`

export const Like = styled.p`
  font-size: .9rem;
`

export const LikeIcon = styled.img`
  width: 15px;
  height: 13px;
  margin-left: 7px;
`;
