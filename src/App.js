import React from "react";
import Streak from "./Streak";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Github Streak</h1>
      <Streak />
    </div>
  );
}

export default App;
