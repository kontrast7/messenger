import React, { useState } from "react";
import { registerTC } from "../../../bll/reducer/registerReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectStatus } from "../../../bll/selector/selectors";
import { Spinner } from "../../../components/spinner/spinner";
import { ErrorSnackbar } from "../../../components/errorSnackbar/ErrorSnackbar";

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
    <section>
      <input
        value={email}
        placeholder={"enter email"}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        value={username}
        placeholder={"enter username"}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        value={password}
        placeholder={"enter password"}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={onSendHandler}>Register</button>
      <ErrorSnackbar />
    </section>
  );
};
