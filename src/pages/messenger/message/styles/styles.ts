import styled from "styled-components";
import { Link } from "react-router-dom";

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
`;

export const InfoInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: .2em;
`;

export const ChatWithUser = styled.p`
  font-size: 0.8rem;
`;

export const AvatarLink = styled(Link)``;
