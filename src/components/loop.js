import React from "react";

import globalstateobj from "../globalstate";

import ImmortalizerForm from "./immortalizerform"

class Loop extends React.Component {
  state = { borderAnimation: "", scrollAnimationUp: false, scrollAnimationDown: false };
  constructor(props) {
    super(props);
    this.lastScroll = 0;
    this.scrollTimer = null;
    this.onscroll = true;
    this.onfirstscroll = true;
    this.notfirstreloadscroll = false;
    this.scrollanimationfinished = true;

    this.loopContentIndex = 0;
    this.lastFocusedContentIndex = 0;
    this.lastArrowPressedTime = 0;
    this.scrolling = null;
  }
  componentDidMount() {
    this.loopcontents = document.getElementsByClassName("loopcontent");
    this.loopcontentheight = this.loopcontents[0].clientHeight;
    this.clones = document.getElementsByClassName("isclone");
    this.clonesHeight = this.loopcontentheight * this.clones.length;

    this.loop = document.getElementById("loop");
    // if scrolled in loopcontent, dont want to trigger wheel event in body.
    // thats why second listener on wheel which stops propagation and set to true
    this.loop.addEventListener("scroll", () => this.onScroll(), true);
    this.loop.addEventListener("wheel", (e) => e.stopPropagation(), true);
    this.loop.scrollTop = 1; // to allow upwards scrolling
    this.scrollHeight = this.loop.scrollHeight;
    // console.log(this.scrollHeight);
    this.disableScrollCheck = false;
  }

  onScroll() {
    this.scrollCheck();
    // console.log("Scrolltop:" + this.loop.scrollTop);
    // plus 2, because 1 is subtracted in jump scroll bottom (=> 3599) 
    // and we want it to be bigger than 3600 so that Math.ceil spits out index 6 instead of 5
    this.loopContentIndex = Math.floor((2 + this.loop.scrollTop) / this.loopcontentheight)
    // scroll gets executed on page load somewhy
    if (this.onscroll && this.notfirstreloadscroll) {
      this.setState({ borderAnimation: "on" });
      this.onscroll = false;
    }

    if (this.scrollTimer !== null) {
      clearTimeout(this.scrollTimer);
    }
    this.scrollTimer = setTimeout(() => {
      this.onscroll = true;
      this.setState({ borderAnimation: "off" });
    }, 100);
    this.notfirstreloadscroll = true;
  }
  scrollCheck() {
    let scrollTop = this.loop.scrollTop;
    globalstateobj.scrollPositionLoop += scrollTop - this.lastScroll;

    this.lastScroll = scrollTop;

    if (scrollTop + this.clonesHeight >= this.scrollHeight) {
      // console.log("Jump Scroll TOP");
      // set to 1 to avoid looping
      this.loop.scrollTop = 1;
      this.lastScroll = 0;
      this.disableScrollCheck = true;
    } else if (scrollTop <= 0) {
      // console.log("Jump Scroll Bottom");
      // subtract in one here to not directly jump to the top again
      this.loop.scrollTop = this.scrollHeight - this.clonesHeight - 1;
      this.lastScroll = this.scrollHeight - this.clonesHeight;
      this.disableScrollCheck = true;
    }
  }

  setArrowAnimation(elem, on) {
    if (on && this.scrollanimationfinished) {
      elem.style.animation = 'none';
      elem.style.animation = '';
      if (elem.id === "uparrow") {
        this.setState({ scrollAnimationUp: true });
      } else if (elem.id === "downarrow") {
        this.setState({ scrollAnimationDown: true });
      }
      this.scrollanimationfinished = false;
    } else {
      setTimeout(() => {
        if (elem.id === "uparrow") {
          this.setState({ scrollAnimationUp: false });
        } else if (elem.id === "downarrow") {
          this.setState({ scrollAnimationDown: false });
        }
        this.scrollanimationfinished = true;
      }, 4000);
    }
  }

  scrollToNextDiv(dir) {
    let now = new Date().getTime();
    if (now - this.lastArrowPressedTime > 500 || this.needDoubleScroll) {
      let contratio = ((this.loop.scrollTop / this.loopcontentheight) - this.loopContentIndex)
      if (dir > 0 && (contratio > 0.3 || now - this.arrowPressedTime < 300))
        this.loopContentIndex += dir

      // Checking for out of bounds index:
      if (this.loopContentIndex > this.loopcontents.length) {
        this.loop.scrollTo(0, 1);
        // need this double scroll because we cant scroll twice in one function call
        setTimeout(() => this.scrollToNextDiv(1), 0);
        this.needDoubleScroll = true;
      } else if (this.loopContentIndex < 0) {
        this.loop.scrollBy(0, -1);
        setTimeout(() => this.scrollToNextDiv(-1), 0);
        this.needDoubleScroll = true;
      } else {
        this.loopcontents[this.loopContentIndex].scrollIntoView({ behavior: "smooth" });
        this.needDoubleScroll = false;
      }
      // console.log("ContIndex: " + this.loopContentIndex)

      this.lastArrowPressedTime = now;
    }
  }

  onScrollArrowPressed(arrow) {
    this.arrowPressedTime = new Date().getTime();
    this.autoScrollTimer = window.setInterval(function() {
      this.loop.scrollBy(0, 4 * arrow);
    }.bind(this), 0);
  }
  onScrollArrowReleased(arrow) {
    clearTimeout(this.autoScrollTimer);
    this.scrollToNextDiv(arrow)
  }

  render() {
    return (
      <>
        <img id="uparrow" onMouseDown={() => this.onScrollArrowPressed(-1)} onMouseUp={() => this.onScrollArrowReleased(-1)}
          src={require("../resources/images/uparrow.png")} onMouseOver={(event) => this.setArrowAnimation(event.target, true)}
          onMouseLeave={(event) => this.setArrowAnimation(event.target, false)} className={`${this.state.scrollAnimationUp ? "bounceUp" : ""}`} alt="Up" />
        <img id="downarrow" onMouseDown={() => this.onScrollArrowPressed(1)} onMouseUp={() => this.onScrollArrowReleased(1)}
          src={require("../resources/images/downarrow.png")} onMouseOver={(event) => this.setArrowAnimation(event.target, true)}
          onMouseLeave={(event) => this.setArrowAnimation(event.target, false)} className={`${this.state.scrollAnimationDown ? "bounceDown" : ""}`} alt="Down" />

        <div id="loop" onMouseLeave={() => (globalstateobj.mouseToRed = false)} onMouseOver={() => (globalstateobj.mouseToRed = true)} className={`${this.state.borderAnimation === "on" ? "animate-on" : "animate-off"}`}>
          <div style={{ height: "3600px" }}>
            <div className="loopcontent">
              <br />
              <br />
              <h1>Welcome to my</h1>
              <h1>World</h1>
            </div>
            <div className="loopcontent">
              <br />
              <br />
              <h1>Some Music</h1>
              <p>To enjoy the ride on my site you can listen to chill spacey music. Feel free to press play:)</p>
            </div>
            <div className="loopcontent">
              <br />
              <br />
              <h1>My Workspace</h1>
              <p>If you don't have great sound, nice lights and a powerfull PC, get it NOW!</p>
            </div>
            <div className="loopcontent">
              <br />
              <br />
              <h1>Things I find</h1>
              <h1>interesting</h1>
            </div>
            <div className="loopcontent">
              <br />
              <br />
              <h1>Ty &lt;3</h1>
              <ImmortalizerForm />
            </div>
          </div>
          <div className="isclone loopcontent">
            <br />
            <br />
            <h1>Welcome to my</h1>
            <h1>World</h1>
          </div>
        </div>
      </>
    );
  }
}

export default Loop;
