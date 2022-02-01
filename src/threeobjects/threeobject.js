export default function Threeobject() {
  this.meshes = [];
}

Threeobject.prototype.update = function (mousex, mousey, scrollposition) {
  Threeobject.prototype.mouseX = mousex;
  Threeobject.prototype.mouseY = mousey;
  Threeobject.prototype.scrollPosition = scrollposition;
};
