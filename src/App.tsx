import React, { useEffect } from "react";
import "./App.css";
import { usersApi } from "./api/api";

function App() {
  useEffect(() => {
    usersApi
      .getAllUsers("62332a59d327af0023f7dfcf")
      .then((res) => console.log(JSON.stringify(res)));
  }, []);

  return (
    <div className="App">
      <header className="App-header">123</header>
    </div>
  );
}

export default App;
