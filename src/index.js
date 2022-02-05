import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./index.css";
import globalstateobj from "./globalstate";

// let mouse = new THREE.Vector2();
// let raycaster = new THREE.Raycaster();
// function updateRaycaster() {
//   raycaster.setFromCamera(mouse, camera);

//   let intersects = raycaster.intersectObjects(scene.children);
//   intersects.forEach((element) => console.log(element));
// }

// loopcontent.addEventListener("scroll", () => {
//   scrollPosition = loopcontent.scrollY;
// });

document.body.addEventListener("mousemove", updateMouse, false);
document.body.addEventListener("mouseenter", updateMouse, false);
document.body.addEventListener("mouseleave", updateMouse, false);
// document.body.addEventListener("mousedown", updateRaycaster, false);

function updateMouse(event) {
  // normalized coordinates
  globalstateobj.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  globalstateobj.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

ReactDOM.render(<App />, document.getElementById("root"));
