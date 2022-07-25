import React from "react";

import globalstateobj from "../globalstate";

import ImmortalizerForm from "./immortalizerform"

class Loopcontent extends React.Component {
  state = {active : ""};
  constructor(props) {
    super(props);
    this.lastScroll = 0;
    this.timer = null;
    this.onscroll = true;
    this.onfirstscroll = true;
    this.notfirstreloadscroll = false;
  }
  componentDidMount() {
    this.clones = document.getElementsByClassName("isclone");
    this.clonesHeight = 0;
    for (let i = 0; i < this.clones.length; i++)
      this.clonesHeight += this.clones[i].clientHeight;

    this.loop = document.getElementById("loopcontent");
    // if scrolled in loopcontent, dont want to trigger wheel event in body.
    // thats why second listener on wheel which stops propagation and set to
    // true
    this.loop.addEventListener("scroll", () => {
      this.scrollCheck();
      // scroll gets executed on page load somewhy
      if (this.onscroll && this.notfirstreloadscroll) {
        this.setState({"active" : "on"});
        // if(this.onfirstscroll) {
        //   document.getElementById("downarrow").hidden = true;
        //   this.onfirstscroll = false;
        // }
        this.onscroll = false;
      }

      if (this.timer !== null) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.onscroll = true;
        this.setState({"active" : "off"});
      }, 150);
      this.notfirstreloadscroll = true;
    }, true);
    this.loop.addEventListener("wheel", (e) => e.stopPropagation(), true);
    this.loop.scrollTop = 1; // to allow upwards scrolling
    this.scrollHeight = this.loop.scrollHeight;
    console.log(this.scrollHeight);
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
    // not really needed somehow, but ill keep it in because its not affecting
    // anything and could prevent bugs
    if (this.disableScrollCheck) {
      // disable scroll jumping for a short time to avoid flickering
      window.setTimeout(() => { this.disableScrollCheck = false; }, 0);
    }
  }

  scrollToNextDiv(id){
    let nextdiv = document.getElementById(id);
    nextdiv.scrollIntoView({behavior: "smooth"});
  }

  render() {
    // window.setInterval(function() {
    //   this.loop.scrollTop += 3;
    // }.bind(this), 12);
    return (<>
        <div id="loopcontent" onMouseLeave =
             {() => globalstateobj.mouseOver = false} onMouseOver =
                 {() => globalstateobj.mouseOver = true} className={`${this.state.active === "on" ? "animate-on" : "animate-off"}`}>
          <div style={{
      height: "3600px" }}>
            <div style={{
      height: "620px" }}>
              <br />
              <br />
              <h1>Welcome to my</h1>
            <h1>World</h1>
            <img onClick={() => this.scrollToNextDiv("cont2")} src={require("../resources/downarrow.png")} className="downarrow" alt="Down"/>
            </div>
            <div style={{height: "820px" }} id="cont2">
              <br />
              <br />
              <h1>Some Music</h1>
            <p>To enjoy the ride on my site you can listen to chill spacey
                music. Feel free to press play:)</p>
            <img onClick={() => this.scrollToNextDiv("cont3")} src={require("../resources/downarrow.png")} className="downarrow" alt="Down"/>
            </div>
           <div style = {{
      height: "720px" }} id="cont3"><br /><br />
           <h1>My Workspace</h1>
            <p>If you don't have great sound, nice lights and a powerfull PC, get it now!</p>
            <img onClick={() => this.scrollToNextDiv("cont4")} src={require("../resources/downarrow.png")} className="downarrow" alt="Down"/>
            </div>
           <div style = {{
      height: "640px" }} id="cont4"><br /><br />
           <h1>Things I find</h1>
              <h1>interesting</h1>
            <img onClick={() => this.scrollToNextDiv("cont5")} src={require("../resources/downarrow.png")} className="downarrow" alt="Down"/>
           </div>
            <div style={{height: "800px" }} id="cont5">
           <h1>Ty &lt;3</h1>
              <ImmortalizerForm />
              <br />
              <br />
              <br />
              <br />
            <p>Back to the beginning</p>
            <img onClick={() => this.scrollToNextDiv("cont1")} src={require("../resources/downarrow.png")} className="downarrow" alt="Down"/>
            </div>
          </div>
          <div className="isclone" id="cont1" style={{
      height: "720px" }}>
              <br />
              <br />
              <h1>Welcome to my</h1>
              <h1>World</h1>
              <img onClick={() => this.scrollToNextDiv("cont2")} src={require("../resources/downarrow.png")} className="downarrow" alt="Down"/>
            </div>
        </div>
      </>
    );
  }
}

export default Loopcontent;
