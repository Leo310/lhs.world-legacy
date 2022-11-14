function Globalstate() {
  this.mouseX = 0;
  this.mouseY = 0;
  this.scrollPositionLoop = 0;
  this.scrollPositionBody = 0;
  this.wheelPosition = 0;
  this.raycasting = false; // if true executes raycasting function
  this.clickedUuid = "";
  this.mouseToRed = false;
  this.mouseDown = false;
  this.wordcloudchanged = false;
  this.wordcloudurl = "";
  this.wordcloudfallback = false;
}

export default new Globalstate();
