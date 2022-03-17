import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoginUserTC } from "../../../bll/redcuer/loginReducer";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onSendHandler = () => {
    dispatch(setLoginUserTC({ email, password }));
  };
  const currentUser = localStorage.getItem("user");
  console.log(currentUser && JSON.parse(currentUser));
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
