import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./index.css";
import globalstateobj from "./globalstate";

document.body.addEventListener("mousemove", updateMouse);
document.body.addEventListener("mouseenter", updateMouse);
document.body.addEventListener("mouseleave", updateMouse);
function updateMouse(event) {
  // normalized coordinates
  globalstateobj.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  globalstateobj.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

document.body.addEventListener(
  "click",
  () => (globalstateobj.raycasting = true)
);

document.body.addEventListener("wheel", (e) => {
  console.log("whheel");
  globalstateobj.scrollPositionBody += e.deltaY;
});

ReactDOM.render(<App />, document.getElementById("root"));
