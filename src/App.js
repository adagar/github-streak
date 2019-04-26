import React from "react";
import Streak from "./Streak";

const gitClrs = ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"];
const divStyle = {
  border: "30px solid " + gitClrs[4],
  borderRadius: "50%",
  MozBorderRadius: "50%",
  WebkitBorderRadius: "50%"
};
function App() {
  return (
    <div className="App container center-align">
      <div className="app-content" style={divStyle}>
        <h1>Github Streak</h1>
        <Streak />
      </div>
    </div>
  );
}

export default App;
