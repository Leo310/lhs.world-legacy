import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./index.css";
import globalstateobj from "./globalstate";
import initMatomo from "./matomotracking";

function updateMouse(event) {
  // normalized coordinates
  globalstateobj.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  globalstateobj.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

document.body.addEventListener("mousemove", updateMouse);
document.body.addEventListener("mouseenter", updateMouse);
document.body.addEventListener("mouseleave", updateMouse);

document.body.addEventListener(
  "mousedown",
  () => {
    globalstateobj.mouseDown = true;
    globalstateobj.raycasting = true;
  }
);

document.body.addEventListener(
  "mouseup",
  () => (globalstateobj.mouseDown = false)
);

document.body.addEventListener("wheel", (e) => {
  globalstateobj.wheelPosition += e.deltaY;
}, { passive: true });

window.onscroll = () => {
  globalstateobj.scrollPositionBody = window.scrollY;
}

initMatomo();

// prevents scroll restoring after page refresh
if (window.history.scrollRestoration)
  window.history.scrollRestoration = 'manual';

ReactDOM.render(<App />, document.getElementById("root"));
