import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoginUserTC } from "../../../bll/reducer/loginReducer";
import { useSelector } from "react-redux";
import { selectStatus } from "../../../bll/selector/selectors";
import { Spinner } from "../../../components/spinner/spinner";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);

  const onSendHandler = () => {
    dispatch(setLoginUserTC({ email, password }));
  };

  if (status === "loading") {
    return <Spinner />;
  }

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
