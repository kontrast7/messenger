import React, { useState } from "react";
import { authApi } from "../../../api/api";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSendHandler = () => {
    authApi
      .loginUser({ email: email, password: password })
      .then((res) => console.log(res));
  };


  return (
    <section>
      <div>
        <input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={onSendHandler}>Login</button>
      </div>
    </section>
  );
};
