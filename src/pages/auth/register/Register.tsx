import React, { useState } from "react";
import { registerTC } from "../../../bll/reducer/registerReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectStatus } from "../../../bll/selector/selectors";
import { Spinner } from "../../../components/spinner/spinner";
import { ErrorSnackbar } from "../../../components/errorSnackbar/ErrorSnackbar";
import { Container } from "../../../styles/global";
import { Wrapper, Inner, RegisterButton } from "./styles/styles";
import { Input } from "../../../components/common/input/styles";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const status = useSelector(selectStatus);

  const dispatch = useDispatch();

  const onSendHandler = () => {
    dispatch(registerTC({ username, email, password }));
  };

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <Container>
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
            type="text"
            label="Password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <RegisterButton onClick={onSendHandler}>Register</RegisterButton>
          <ErrorSnackbar />
        </Inner>
      </Wrapper>
    </Container>
  );
};
