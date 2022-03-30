import React from "react";
import Clock from "./components/clock";
import Loopcontent from "./components/loopcontent";
import Threecontainer from "./components/threecontainer";
import Name from "./components/name";

function App() {
  return (
    <>
      <audio id="audio0">
        <source src={require("./resources/music2.mp3")} />
      </audio>
      <audio id="audio1">
        <source src={require("./resources/music1.mp3")} />
      </audio>
      <audio id="audio2">
        <source src={require("./resources/music0.wav")} />
      </audio>
      <Name />
      <Clock />
      <Loopcontent />
      <Threecontainer />
    </>
  );
}

export default App;
