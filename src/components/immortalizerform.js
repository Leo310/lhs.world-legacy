import React from "react";

import globalstateobj from "../globalstate";

class ImmortalizerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value : ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchWordcloud();
  }
  handleChange(event) { this.setState({value : event.target.value}); }

  async fetchWordcloud() {
    let res = await fetch("http://192.168.142.21:5000", {
      method : 'POST',
      headers :
          {'Accept' : 'application/json', 'Content-Type' : 'application/json'},
      body : JSON.stringify({word : this.state.value})
    });
    const imageBlob = await res.blob();
    let url = URL.createObjectURL(imageBlob);
    globalstateobj.wordcloudurl = url;
    // const svg = await res.text();
    // var blob = new Blob([ svg ], {type : "text/plain;charset=utf-8"});
    // let url = URL.createObjectURL(blob);
    globalstateobj.wordcloudurl = url;
    globalstateobj.wordcloudchanged = true;
  }
  handleSubmit(event) {
    this.fetchWordcloud();

    event.preventDefault();
  }

  render() {
    return (
      <>
      <p>Immortalize yourself here. Be aware, you can only do it once and you can't go back!</p>
      <form onSubmit={this.handleSubmit} style={{
      display: "inline-block", width: "100%"}}>
        <input placeholder="Your words" type="text" value={this.state.value} onChange={
      this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
      </>
    );
  }
}

export default ImmortalizerForm;
