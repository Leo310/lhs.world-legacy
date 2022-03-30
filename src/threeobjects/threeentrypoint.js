import SceneCursor from "./sceneCursor/sceneCursor";
import SceneBack from "./sceneBack/sceneBack";

export default function ThreeEntryPoint(threecontainer) {
  let sceneCursor = new SceneCursor(threecontainer);
  let sceneBack = new SceneBack(threecontainer);

  function render() {
    requestAnimationFrame(render);
    if(window.innerWidth > 768)
      sceneCursor.update();
    sceneBack.update();
  }
  render();
}
