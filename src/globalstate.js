function Globalstate() {
  this.mouseX = 0;
  this.mouseY = 0;
  this.scrollPositionLoop = 0;
  this.scrollPositionBody = 0;
  this.raycasting = false; // if true executes raycasting function
  this.clickedUuid = "";
  this.mouseToRed = false;
  this.mouseDown = false;
  this.wordcloudchanged = false;
  this.wordcloudurl = "";
}

export default new Globalstate();
