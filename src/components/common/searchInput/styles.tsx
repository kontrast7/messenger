import React from "react";
import styled from "styled-components";
//@ts-ignore
import searchLogo from "../../../assets/images/icons/search-icon.svg";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClick: () => void;
}

export const InputGroup = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  width: 100%;
  overflow: hidden;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.searchbar};
`;

export const InputField = styled.input`
  width: 100%;
  height: 100%;
  background-color: inherit;
  border: none;
  padding-left: 13px;
  color: ${({ theme }) => theme.colors.inputColor};

  &:focus {
    outline: none;
  }
`;

export const InputButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  background-color: #565e70;
  border: none;
`;

export const SearchInput: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  onClick,
}) => {
  return (
    <InputGroup>
      <InputField value={value} onChange={onChange} placeholder={placeholder} />
      <InputButton onClick={onClick}>
        <img src={searchLogo} alt="Search button" />
      </InputButton>
    </InputGroup>
  );
};
