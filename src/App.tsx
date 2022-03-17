import React from "react";
import "./App.css";
import { Login } from "./pages/auth/login/Login";
import { Register } from "./pages/auth/register/Register";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>Login</div>
        <Login />
        <div>Register</div>
        <Register />
      </header>
    </div>
  );
}

export default App;
