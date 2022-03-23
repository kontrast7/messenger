import styled from "styled-components/macro";

export const SentMessage = styled.div`
  background: #272a35;
  padding-top: 23px;
  padding-right: 14px;
  padding-bottom: 5px;
  padding-left: 14px;
  border-radius: 20px;
  align-self: end;
  text-align: right;
`;

export const ReceivedMessage = styled.div`
  background: #373e4e;
  padding-top: 12px;
  padding-right: 14px;
  padding-bottom: 5px;
  padding-left: 14px;
  border-radius: 20px;
  align-self: start;
  text-align: left;
`;

export const InfoWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const DeleteButton = styled.div`
  position: absolute;
  top: -17px;
  font-size: 0.8rem;
  color: #ce2828;
  cursor: pointer;
`;

export const SentMessageTime = styled.p`
  font-size: 0.7rem;
  font-weight: 300;
  text-align: left;
`;
export const ReceivedMessageTime = styled.p`
  text-align: right;
  font-size: 0.7rem;
  font-weight: 300;
`;

export const Text = styled.p``;
