import React from "react";
import Streak from "./Streak";

let divStyle = {
  background: "ebedf0"
};

function App() {
  return (
    <div className="App container center-align style={divStyle}">
      <div className="app-content">
        <h1>Github Streak</h1>
        <Streak />
      </div>
    </div>
  );
}

export default App;
