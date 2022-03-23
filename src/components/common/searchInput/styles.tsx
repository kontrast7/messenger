import React from "react";
import styled from "styled-components";
//@ts-ignore
import searchLogo from "../../../assets/images/icons/search-icon.svg";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClick: () => void;
}

export const InputWrapper = styled.div`
  position: sticky;
  top: -15px;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 2rem 0;
  z-index: 10;
`;

export const InputGroup = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
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

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 1px;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1rem;
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
  border-radius: 10px 0 0 10px;
`;

export const SearchInput: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  onClick,
  onKeyPress,
}) => {
  return (
    <InputWrapper>
      <InputGroup>
        <InputField
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onKeyPress={onKeyPress}
        />
        <InputButton onClick={onClick}>
          <img src={searchLogo} alt="Search button" />
        </InputButton>
      </InputGroup>
    </InputWrapper>
  );
};
