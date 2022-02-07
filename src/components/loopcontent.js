import React from "react";
import Name from "./name";

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
    this.disableScrollCheck = false;
  }
  scrollCheck() {
    // console.log(this.loop.scrollTop, ",  ", this.scrollHeight);
    if (!this.disableScrollCheck) {
      let scrollTop = this.loop.scrollTop;
      globalstateobj.scrollPositionLoop += scrollTop - this.lastScroll;

      this.lastScroll = scrollTop;

      if (scrollTop + this.clonesHeight >= this.scrollHeight) {
        // scroll to top and set to 1 to avoid looping
        this.loop.scrollTop = 14;
        this.lastScroll = 0;
        this.disableScrollCheck = true;
      } else if (scrollTop <= 0) {
        // scroll to bottom
        this.loop.scrollTop = this.scrollHeight - this.clonesHeight - 14;
        this.lastScroll = this.scrollHeight - this.clonesHeight;
        this.disableScrollCheck = true;
      }
    }
    if (this.disableScrollCheck) {
      // disable scroll jumping for a short time to avoid flickering
      window.setTimeout(() => {
        this.disableScrollCheck = false;
      }, 40);
    }
  }

  render() {
    return (
      <>
        <div id="loopcover"></div>
        <div id="loopcontent">
          <div style={{ paddingTop: "50px", height: "120px" }}>
            <Name />
          </div>
          <div style={{ display: "block", height: "320px" }}>
            <p
              style={{
                textAlign: "center",
                color: "#8be9fd",
                fontSize: "1.3vw",
              }}
            >
              GANZ OBEN Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
              sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
              aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
              duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor
              sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
              tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            </p>
          </div>
          <div style={{ display: "block", height: "auto" }}>
            <p
              style={{
                textAlign: "center",
                color: "#8be9fd",
                fontSize: "1.3vw",
              }}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
            </p>
          </div>
          <br />
          <br />
          <h1>Sick Mukke</h1>
          <br />
          <br />
          <div style={{ display: "block", height: "auto" }}>
            <p
              style={{
                textAlign: "center",
                color: "#8be9fd",
                fontSize: "1.3vw",
              }}
            >
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.
            </p>
          </div>
          <div
            className="isclone"
            style={{ paddingTop: "50px", height: "120px" }}
          >
            <Name />
          </div>
          <div
            className="isclone"
            style={{ display: "block", height: "320px" }}
          >
            <p
              style={{
                textAlign: "center",
                color: "#8be9fd",
                fontSize: "1.3vw",
              }}
            >
              GANZ OBEN Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
              sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
              aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
              duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor
              sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
              tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Loopcontent;
