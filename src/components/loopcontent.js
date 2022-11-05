import React from "react";

import globalstateobj from "../globalstate";

import ImmortalizerForm from "./immortalizerform"

class Loopcontent extends React.Component {
  state = { borderAnimation: "", scrollAnimation: false };
  constructor(props) {
    super(props);
    this.lastScroll = 0;
    this.timer = null;
    this.onscroll = true;
    this.onfirstscroll = true;
    this.notfirstreloadscroll = false;
    this.scrollanimationfinished = true;
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
  setScrollAnimation(on) {
    // let elems = document.getElementsByClassName("downarrow");
    // Array.prototype.forEach.call(elems, (elem) => {
    //   elem.style.animation = 'none';
    //   console.log(elem.offsetHeight);
    //   elem.style.animation = '';
    // });
    // this.setState({scrollAnimation: on});
    if (on && this.scrollanimationfinished) {
      let elems = document.getElementsByClassName("downarrow");
      Array.prototype.forEach.call(elems, (elem) => {
        elem.style.animation = 'none';
        elem.style.animation = '';
      });
      this.setState({ scrollAnimation: true });
      this.scrollanimationfinished = false;
    } else {
      setTimeout(() => {
        this.setState({ scrollAnimation: false });
        this.scrollanimationfinished = true;
      }, 4000);
    }
  }

  scrollToNextDiv(id) {
    let nextdiv = document.getElementById(id);
    nextdiv.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    // window.setInterval(function() {
    //   this.loop.scrollTop += 3;
    // }.bind(this), 12);
    return (
      <>
        <div id="loopcontent" onMouseLeave={() => (globalstateobj.mouseToRed = false)} onMouseOver={() => (globalstateobj.mouseToRed = true)} className={`${this.state.borderAnimation === "on" ? "animate-on" : "animate-off"}`}>
          <div style={{ height: "3600px" }}>
            <div style={{ height: "720px" }}>
              <br />
              <br />
              <h1>Welcome to my</h1>
              <h1>World</h1>
              <img onClick={() => this.scrollToNextDiv("cont2")} src={require("../resources/images/downarrow.png")} onMouseOver={() => this.setScrollAnimation(true)} onMouseLeave={() => this.setScrollAnimation(false)} className={`downarrow ${this.state.scrollAnimation ? "bounce" : ""}`} alt="Down" />
            </div>
            <div style={{ height: "720px" }} id="cont2">
              <br />
              <br />
              <h1>Some Music</h1>
              <p>To enjoy the ride on my site you can listen to chill spacey music. Feel free to press play:)</p>
              <img onClick={() => this.scrollToNextDiv("cont3")} src={require("../resources/images/downarrow.png")} onMouseOver={() => this.setScrollAnimation(true)} onMouseLeave={() => this.setScrollAnimation(false)} className={`downarrow ${this.state.scrollAnimation ? "bounce" : ""}`} alt="Down" />
            </div>
            <div style={{ height: "720px" }} id="cont3">
              <br />
              <br />
              <h1>My Workspace</h1>
              <p>If you don't have great sound, nice lights and a powerfull PC, get it NOW!</p>
              <img onClick={() => this.scrollToNextDiv("cont4")} src={require("../resources/images/downarrow.png")} onMouseOver={() => this.setScrollAnimation(true)} onMouseLeave={() => this.setScrollAnimation(false)} className={`downarrow ${this.state.scrollAnimation ? "bounce" : ""}`} alt="Down" />
            </div>
            <div style={{ height: "720px" }} id="cont4">
              <br />
              <br />
              <h1>Things I find</h1>
              <h1>interesting</h1>
              <img onClick={() => this.scrollToNextDiv("cont5")} src={require("../resources/images/downarrow.png")} onMouseOver={() => this.setScrollAnimation(true)} onMouseLeave={() => this.setScrollAnimation(false)} className={`downarrow ${this.state.scrollAnimation ? "bounce" : ""}`} alt="Down" />
            </div>
            <div style={{ height: "720px" }} id="cont5">
              <h1>Ty &lt;3</h1>
              <ImmortalizerForm />
              <img onClick={() => this.scrollToNextDiv("cont1")} src={require("../resources/images/downarrow.png")} onMouseOver={() => this.setScrollAnimation(true)} onMouseLeave={() => this.setScrollAnimation(false)} className={`downarrow ${this.state.scrollAnimation ? "bounce" : ""}`} alt="Down" />
            </div>
          </div>
          <div className="isclone" id="cont1" style={{ height: "720px" }}>
            <br />
            <br />
            <h1>Welcome to my</h1>
            <h1>World</h1>
            <img onClick={() => this.scrollToNextDiv("cont2")} src={require("../resources/images/downarrow.png")} onMouseOver={() => this.setScrollAnimation(true)} onMouseLeave={() => this.setScrollAnimation(false)} className={`downarrow ${this.state.scrollAnimation ? "bounce" : ""}`} alt="Down" />
          </div>
        </div>
      </>
    );
  }
}

export default Loopcontent;
