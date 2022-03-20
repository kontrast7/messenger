import styled from "styled-components"

export const InputFile = styled.input`

  ::-webkit-file-upload-button {
    visibility: hidden;
  }

  ::before {
    content: 'Select some files';
    display: inline-block;
    background: linear-gradient(top, #f9f9f9, #e3e3e3);
    border: 1px solid #999;
    border-radius: 3px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 700;
    font-size: 10pt;
  }

  :hover::before {
    border-color: black;
  }

  :active::before {
    background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
  }
`