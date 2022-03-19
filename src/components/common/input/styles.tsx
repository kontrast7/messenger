import styled from "styled-components";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

const InputGroup = styled.div`
  position: relative;
`;

const InputLabel = styled.label`
  color: #8d8d8d;
  position: absolute;
  top: 23px;
  left: 20px;
  background: ${({ theme }) => theme.colors.inputColor};
  transition: 300ms;
  transform: translate(0, -50%);
`;

const InputField = styled.input`
  outline: none;
  padding: 12px 22px;
  font-size: ${({ theme }) => theme.fontSize.contactName};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.inputColor};
  border: 2px solid transparent;
  color: ${({ theme }) => theme.colors.sendMessage};

  &:focus {
    border: 2px solid ${(props) => props.theme.colors.accentColor};
  }

  &:valid + ${InputLabel} {
    top: -1px;
    padding: 0 3px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.receivedMessage};
  }

  &:focus + ${InputLabel} {
    top: -1px;
    padding: 0 3px;
    font-size: 14px;
    transition: 300ms;
  }
`;

export const Input: React.FC<InputProps> = ({ id, label, ...rest }) => {
  return (
    <InputGroup>
      <InputField id={id} {...rest} />
      <InputLabel htmlFor={id}>{label}</InputLabel>
    </InputGroup>
  );
};
