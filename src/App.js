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
  //Testing google cloud function
  const fetchReq = `https://us-central1-github-streak-d7ba0.cloudfunctions.net/helloWorld`;

  fetch(fetchReq).then((json) => {
    console.log(json);
  });

  let appContainer = React.createRef();

  return (
    <div className="App container center-align">
      <div className="app-content" style={divStyle}>
        <h1>Github Streak</h1>
        <Streak ref="app-container" />
      </div>
    </div>
  );
}

export default App;
