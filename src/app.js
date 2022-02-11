import React from "react";
import Clock from "./components/clock";
import Loopcontent from "./components/loopcontent";
import Threecontainer from "./components/threecontainer";
import Name from "./components/name";

function App() {
  return (
    <>
      <audio id="audio">
        <source src={require("./resources/music.wav")} />
      </audio>
      <Name />
      <Clock />
      <Loopcontent />
      <Threecontainer />
    </>
  );
}

export default App;
