import React from "react";

import globalstateobj from "../globalstate";

class Loopcontent extends React.Component {
  constructor(props) {
    super(props);
    this.lastScroll = 0;
  }
  componentDidMount() {
    this.clones = document.getElementsByClassName("isclone");
    this.clonesHeight = 0;
    for (let i = 0; i < this.clones.length; i++)
      this.clonesHeight += this.clones[i].clientHeight;

    this.loop = document.getElementById("loopcontent");
    // if scrolled in loopcontent, dont want to trigger wheel event in body. thats why second listener on wheel which stops propagation and set to true
    this.loop.addEventListener("scroll", () => this.scrollCheck(), true);
    this.loop.addEventListener("wheel", (e) => e.stopPropagation(), true);
    this.loop.scrollTop = 1; // to allow upwards scrolling
    this.scrollHeight = this.loop.scrollHeight;
    console.log(this.scrollHeight)
    this.disableScrollCheck = false;
  }
  scrollCheck() {
    // console.log(
    //   this.loop.scrollTop,
    //   "  , ",
    //   this.clonesHeight,
    //   ",  ",
    //   this.scrollHeight
    // );
    // this.disableScrollCheck = true;
    // this.loop.scrollTop = 3600 - 3000;
    if (!this.disableScrollCheck) {
      let scrollTop = this.loop.scrollTop;
      globalstateobj.scrollPositionLoop += scrollTop - this.lastScroll;

      this.lastScroll = scrollTop;

      if (scrollTop + this.clonesHeight >= this.scrollHeight) {
        // scroll to top and set to 1 to avoid looping. * set to 15, idk why but works better
        this.loop.scrollTop = 1;
        this.lastScroll = 0;
        this.disableScrollCheck = true;
      } else if (scrollTop <= 0) {
        // scroll to bottom
        this.loop.scrollTop = this.scrollHeight - this.clonesHeight - 1;
        this.lastScroll = this.scrollHeight - this.clonesHeight;
        this.disableScrollCheck = true;
      }
    }
    // not really needed somehow, but ill keep it in because its not affecting anything and could prevent bugs
    if (this.disableScrollCheck) {
      // disable scroll jumping for a short time to avoid flickering
      window.setTimeout(() => {
        this.disableScrollCheck = false;
      }, 0);
    }
  }

  render() {
    return (
      <>
        <div id="loopcover"></div>
        <div id="loopcontent">
          <div style={{ height: "3600px" }}>
            <div style={{height: "720px" }}>
              <h1>Welcome to my</h1>
              <h1>World!</h1>
              <p>
                This page is full of hidden features. Find them...
              </p>
            </div>
            <div style={{height: "720px" }}>
              <h1>Sick Mukke</h1>
              <p>
                To enjoy the ride on my site you can listen to some sick mukke.
                Feel free to press play :)
              </p>
            </div>
            <div style={{height: "720px" }}>
              <br/>
              <br/>
              <h1>My Workspace</h1>
            </div>
            <div style={{height: "720px" }}>
              <br/>
              <br/>
              <h1>My Skills</h1>
            </div>
            <div style={{height: "720px" }}>
              <br/>
              <br/>
              <h1>My Skills</h1>
            </div>
          </div>
          <div className="isclone" style={{ height: "720px" }}>
              <h1>Welcome to my</h1>
              <h1>World!</h1>
              <p>
                This page is full of hidden features. Find them...
              </p>
            </div>
        </div>
      </>
    );
  }
}

export default Loopcontent;
