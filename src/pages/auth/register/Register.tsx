import React, { useState } from "react";
import { registerTC } from "../../../bll/redcuer/registerReducer";
import { useDispatch } from "react-redux";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  const onSendHandler = () => {
    dispatch(registerTC({ username, email, password }));
  };

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
    </section>
  );
};
