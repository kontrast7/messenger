import styled from "styled-components";
import React from "react"

export const InputLabel = styled.label`
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
`;

export const Input = styled.input`
  display: none;
`

export const InputFile: React.FC<InputFilePropsType> = ({onChange, title}) => {
  return (
    <>
      <InputLabel htmlFor="file-upload">
        {title}
      </InputLabel>
      <Input onChange={onChange} id="file-upload" type="file" />
    </>
  );
};

type InputFilePropsType = {
  onChange: (e: any) => void
  title: string
}
