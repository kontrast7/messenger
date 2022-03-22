import styled from "styled-components";

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
`;

export const PostImage = styled.img`
  max-height: 200px;
`;

export const CreatedInfo = styled.div`
  align-items: end;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export const CratedDate = styled.p`
  font-size: .8rem;
`;

export const CreatedBy = styled.p`
  font-size: .8rem;
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
