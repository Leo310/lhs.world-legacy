import React from "react";
import Name from "./name";

import globalstateobj from "../globalstate";

class Loopcontent extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <>
        <div id="loopcover"></div>
        <div
          onScroll={(e) => (globalstateobj.scrollPosition = e.target.scrollTop)}
          id="loopcontent"
        >
          <Name />
          <br />
          <p style={{ textAlign: "center", color: "#8be9fd" }}>
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
          <Name />
          <Name />
          <Name />
          <Name />
        </div>
      </>
    );
  }
}

export default Loopcontent;
