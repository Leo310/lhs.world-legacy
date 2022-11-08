import React from "react";

import Clock from "./components/clock";
import Loop from "./components/loop";
import Name from "./components/name";
import Threecontainer from "./components/threecontainer";

function App() {
  return (
    <>
      <audio className="audio">
        <source src={
          require("./resources/music/music1.mp3")} />
      </audio>
      <audio className="audio">
        <source src={
          require("./resources/music/music0.wav")} />
      </audio>
      <audio className="audio">
        <source src={
          require("./resources/music/music2.mp3")} />
      </audio>
      <Name />
      <Loop />
      <Threecontainer />
    </>
  );
}

export default App;
