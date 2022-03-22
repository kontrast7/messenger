import { ReactChildren } from "react";
import React from "react";
import { Inner } from "./styles/styles";

export const Post: React.FC<PostPropsType> = ({ children }) => {
  return <Inner>{children}</Inner>;
};

type PostPropsType = {};
