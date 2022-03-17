import React, { useState } from "react";
import { authApi } from "../../../api/api";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const onSendHandler = () => {
    authApi
      .registerUser({
        username: username,
        email: email,
        password: password,
      })
      .then((res) => console.log(res));
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
