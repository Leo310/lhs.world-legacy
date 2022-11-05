import React from "react";

import Clock from "./components/clock";
import Loopcontent from "./components/loopcontent";
import Name from "./components/name";
import Threecontainer from "./components/threecontainer";

function App() {
  return (
    <>
      <audio id="audio0">
        <source src={
          require("./resources/music/music1.mp3")} />
      </audio>
      <audio id="audio1">
        <source src={
          require("./resources/music/music0.wav")} />
      </audio>
      <audio id="audio2">
        <source src={
          require("./resources/music/music2.mp3")} />
      </audio>
      <Name />
      <Loopcontent />
      <Threecontainer />
    </>
  );
}

export default App;
