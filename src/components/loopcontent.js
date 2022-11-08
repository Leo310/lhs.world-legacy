import React from "react";

import globalstateobj from "../globalstate";

import ImmortalizerForm from "./immortalizerform"

class Loopcontent extends React.Component {
  state = { borderAnimation: "", scrollAnimationUp: false, scrollAnimationDown: false };
  constructor(props) {
    super(props);
    this.lastScroll = 0;
    this.timer = null;
    this.onscroll = true;
    this.onfirstscroll = true;
    this.notfirstreloadscroll = false;
    this.scrollanimationfinished = true;

    this.focusedContentIndex = 1;
    this.lastFocusedContentIndex = 1;
    this.lastArrowPressedTime = 0;
    this.scrolling = null;
  }
  componentDidMount() {
    this.clones = document.getElementsByClassName("isclone");
    this.clonesHeight = 0;
    for (let i = 0; i < this.clones.length; i++)
      this.clonesHeight += this.clones[i].clientHeight;

    this.loop = document.getElementById("loopcontent");
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
    console.log("Scrolltop:" + this.loop.scrollTop);
    // plus two because 1 is subtracted in jump scroll bottom (=> 3599) 
    // and we want it to be bigger than 3600 so that Math.ceil spits out index 6 instead of 5
    this.focusedContentIndex = Math.ceil((2 + this.loop.scrollTop) / 720)
    console.log("ContIndexA: " + this.focusedContentIndex)
    // scroll gets executed on page load somewhy
    if (this.onscroll && this.notfirstreloadscroll) {
      this.setState({ borderAnimation: "on" });
      this.onscroll = false;
    }

    if (this.timer !== null) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
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
      // scroll to top and set to 1 to avoid looping. * set to 15, idk why but
      // works better
      console.log("Jump Scroll TOP");
      this.loop.scrollTop = 1;
      this.lastScroll = 0;
      this.disableScrollCheck = true;
    } else if (scrollTop <= 0) {
      // scroll to bottom
      console.log("Jump Scroll Bottom");
      // subtract in one here to not directly jump to the top again
      this.loop.scrollTop = this.scrollHeight - this.clonesHeight - 1;
      this.lastScroll = this.scrollHeight - this.clonesHeight;
      this.disableScrollCheck = true;
    }
  }
  setScrollAnimation(elem, on) {
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
      this.focusedContentIndex += dir
      // Checking for out of bounds index:
      if (this.focusedContentIndex > 6) {
        this.loop.scrollTo(0, 1);
        // need this double scroll because we cant scroll twice in one function call
        setTimeout(() => this.scrollToNextDiv(1), 0);
        this.needDoubleScroll = true;
      } else if (this.focusedContentIndex < 1) {
        this.loop.scrollBy(0, -1);
        setTimeout(() => this.scrollToNextDiv(-1), 0);
        this.needDoubleScroll = true;
      } else {
        let nextdiv = document.getElementById("cont" + this.focusedContentIndex);
        nextdiv.scrollIntoView({ behavior: "smooth" });
        this.needDoubleScroll = false;
      }
      console.log("ContIndex: " + this.focusedContentIndex)

      this.lastArrowPressedTime = now;
    }
  }

  render() {
    // window.setInterval(function() {
    //   this.loop.scrollTop += 3;
    // }.bind(this), 12);
    return (
      <>
        <img id="uparrow" /*onMouseDown={() => this.scolling = setInterval(() => this.loop.scrollBy(0, -1), 1)} onMouseUp={() => clearInterval(this.scolling)}*/ onClick={() => this.scrollToNextDiv(-1)} src={require("../resources/images/uparrow.png")} onMouseOver={(event) => this.setScrollAnimation(event.target, true)} onMouseLeave={(event) => this.setScrollAnimation(event.target, false)} className={`${this.state.scrollAnimationUp ? "bounceUp" : ""}`} alt="Up" />
        <img id="downarrow" onClick={() => this.scrollToNextDiv(1)} src={require("../resources/images/downarrow.png")} onMouseOver={(event) => this.setScrollAnimation(event.target, true)} onMouseLeave={(event) => this.setScrollAnimation(event.target, false)} className={`${this.state.scrollAnimationDown ? "bounceDown" : ""}`} alt="Down" />
        <div id="loopcontent" onMouseLeave={() => (globalstateobj.mouseToRed = false)} onMouseOver={() => (globalstateobj.mouseToRed = true)} className={`${this.state.borderAnimation === "on" ? "animate-on" : "animate-off"}`}>
          <div style={{ height: "3600px" }}>
            <div style={{ height: "720px" }} id="cont1">
              <br />
              <br />
              <h1>Welcome to my</h1>
              <h1>World</h1>
            </div>
            <div style={{ height: "720px" }} id="cont2">
              <br />
              <br />
              <h1>Some Music</h1>
              <p>To enjoy the ride on my site you can listen to chill spacey music. Feel free to press play:)</p>
            </div>
            <div style={{ height: "720px" }} id="cont3">
              <br />
              <br />
              <h1>My Workspace</h1>
              <p>If you don't have great sound, nice lights and a powerfull PC, get it NOW!</p>
            </div>
            <div style={{ height: "720px" }} id="cont4">
              <br />
              <br />
              <h1>Things I find</h1>
              <h1>interesting</h1>
            </div>
            <div style={{ height: "720px" }} id="cont5">
              <br />
              <br />
              <h1>Ty &lt;3</h1>
              <ImmortalizerForm />
            </div>
          </div>
          <div className="isclone" id="cont6" style={{ height: "720px" }}>
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

export default Loopcontent;
