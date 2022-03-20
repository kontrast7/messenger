import styled from "styled-components";

export const Wrapper = styled.section`
  height: 100vh;
`;

export const Inner = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const RegisterButton = styled.button`
  padding: 0.6rem 2.5rem;
  border: 2px solid ${({ theme }) => theme.colors.inputColor};
  color: ${({ theme }) => theme.colors.inputColor};
  background: transparent;
  font-size: ${({ theme }) => theme.fontSize.contactName};
  font-weight: bold;
  margin-top: 0.5rem;
`;
