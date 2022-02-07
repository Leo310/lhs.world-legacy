import React from "react";
import Clock from "./components/clock";
import Loopcontent from "./components/loopcontent";
import Threecontainer from "./components/threecontainer";

function App() {
  return (
    <>
      <audio id="audio" src={require("./resources/music.wav")}></audio>
      <Clock />
      <Loopcontent />
      <Threecontainer />
    </>
  );
}

export default App;
