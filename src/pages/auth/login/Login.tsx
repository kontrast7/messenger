import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoginUserTC } from "../../../bll/reducer/loginReducer";
import { useSelector } from "react-redux";
import { selectStatus } from "../../../bll/selector/selectors";
import { Spinner } from "../../../components/spinner/spinner";
import { ErrorSnackbar } from "../../../components/errorSnackbar/ErrorSnackbar";
import { Input } from "../../../components/common/input/styles";
import {
  LoginButton,
  DontHaveAccount,
  Inner,
  Wrapper,
  DontHaveAccountLink,
} from "./style/style";
import { useEffect } from "react";
import { selectIsLoggedIn } from "../../../bll/selector/selectors";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../bll/routes/routes";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const onSendHandler = () => {
    dispatch(setLoginUserTC({ email, password }));
  };

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <Wrapper>
      <Inner>
        <Input
          required
          type="text"
          label="Email"
          id="login-email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <Input
          required
          type="password"
          label="Password"
          id="login-password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <LoginButton onClick={onSendHandler}>Login</LoginButton>
        <DontHaveAccount>
          Don't have an account?
          <DontHaveAccountLink to={routes.register}>
            Sign up
          </DontHaveAccountLink>
        </DontHaveAccount>
      </Inner>
      <ErrorSnackbar />
    </Wrapper>
  );
};
