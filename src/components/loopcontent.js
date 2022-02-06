import React from "react";
import ReactDOM from "react-dom";
import Name from "./name";

import globalstateobj from "../globalstate";

class Loopcontent extends React.Component {
  constructor(props) {
    super(props);
    this.lastScroll = 0;
    this.clone = React.createRef();
  }
  componentDidMount() {
    // this.cloneHeight = this.clone.current.style.height;
    // this.cloneHeight = ReactDOM.findDOMNode(this.clone.current).clientHeight;
    this.cloneHeight = 66 * 4;
    this.loop = document.getElementById("loopcontent");
    this.loop.scrollTop = 1; // to allow upwards scrolling
    this.scrollHeight = this.loop.scrollHeight;
    this.disableScroll = false;
  }
  scrollCheck() {
    console.log(this.loop.scrollTop, ",  ", this.scrollHeight);
    if (!this.disableScroll) {
      let scrollTop = this.loop.scrollTop;
      if (scrollTop > 1)
        globalstateobj.scrollPosition += scrollTop - this.lastScroll;
      this.lastScroll = scrollTop;

      if (scrollTop + this.cloneHeight >= this.scrollHeight) {
        // scroll to top and set to 1 to avoid looping
        this.loop.scrollTop = 1;
        this.disableScroll = true;
      } else if (scrollTop <= 0) {
        // scroll to bottom
        this.loop.scrollTop = this.scrollHeight - this.cloneHeight;
        this.disableScroll = true;
      }
    }
    if (this.disableScroll) {
      // disable scroll jumping for a short time to avoid flickering
      window.setTimeout(() => {
        this.disableScroll = false;
      }, 40);
    }
  }

  render() {
    return (
      <>
        <div id="loopcover"></div>
        <div onScroll={(e) => this.scrollCheck(e)} id="loopcontent">
          <br />
          <p
            style={{ textAlign: "center", color: "#8be9fd", fontSize: "1.3vw" }}
          >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
          <p
            style={{ textAlign: "center", color: "#8be9fd", fontSize: "1.3vw" }}
          >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
          <p
            style={{ textAlign: "center", color: "#8be9fd", fontSize: "1.3vw" }}
          >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
          <Name />
          <p
            style={{ textAlign: "center", color: "#8be9fd", fontSize: "1.3vw" }}
          >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
          <p
            style={{ textAlign: "center", color: "#8be9fd", fontSize: "1.3vw" }}
          >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
          <Name ref={this.clone} />
          <Name />
          <Name />
          <Name />
        </div>
      </>
    );
  }
}

export default Loopcontent;
