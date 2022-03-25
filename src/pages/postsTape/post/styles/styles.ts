import styled from "styled-components/macro";

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
  padding: 1rem 0.5em;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  background-color: ${({ theme }) => theme.colors.inputColor};
  color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
`;

export const PostImage = styled.img`
  max-height: 200px;
  align-self: center;
`;

export const CreatedInfo = styled.div`
  align-items: end;
  display: flex;
  flex-direction: column;
  gap: 0.3em;
`;

export const CratedDate = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.receivedMessage};
  text-align: end;
  flex: 1;
`;

export const CreatedBy = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.receivedMessage};
`;

export const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Description = styled.p`
  font-size: 1.1rem;
`;
