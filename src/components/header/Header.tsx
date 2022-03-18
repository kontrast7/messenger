import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../bll/routes/routes";

export const Header = () => {
  return (
    <header>
      <span style={{ background: "white", display: "flex", gap: "1rem" }}>
        <Link to={routes.home}>Home</Link>
        <Link to={routes.login}>Login</Link>
        <Link to={routes.register}>Register</Link>
        <Link to={routes.contacts}>Contacts</Link>
      </span>
    </header>
  );
};
