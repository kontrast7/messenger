import React, { useState } from "react";
import { registerTC } from "../../../bll/reducer/registerReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectStatus } from "../../../bll/selector/selectors";
import { Spinner } from "../../../components/spinner/spinner";
import { ErrorSnackbar } from "../../../components/errorSnackbar/ErrorSnackbar";
import { Wrapper, Inner, RegisterButton } from "./styles/styles";
import { Input } from "../../../components/common/input/styles";
import { selectIsLoggedIn } from "../../../bll/selector/selectors";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DontHaveAccount } from "../login/style/style";
import { DontHaveAccountLink } from "../login/style/style";
import { routes } from "../../../bll/routes/routes";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const status = useSelector(selectStatus);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(routes.contacts);
    }
  }, [isLoggedIn]);

  const dispatch = useDispatch();

  const payload = {
    username,
    email,
    password,
  };

  const onSendHandler = () => {
    dispatch(registerTC(payload, navigate));
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
          id="register-email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <Input
          required
          type="text"
          label="Username"
          id="register-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          required
          type="password"
          label="Password"
          id="register-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <RegisterButton onClick={onSendHandler}>Register</RegisterButton>
        <DontHaveAccount>
          Already have an account?
          <DontHaveAccountLink to={routes.login}>Sign in</DontHaveAccountLink>
        </DontHaveAccount>
        <ErrorSnackbar />
      </Inner>
    </Wrapper>
  );
};
