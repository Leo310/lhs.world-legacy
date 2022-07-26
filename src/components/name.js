import React from "react";

import globalstateobj from "../globalstate";

class Name extends React.Component {
  state = {
    active: ""
  }
  constructor(props) {
    super(props);
    this.randomstring = "  ¿⁋adeghilnor$ΛΔ.Ω%#?";
    // this.randomstring = "  ⁋efhijlmnorstuvw$%#?";
    this.state = {name : ""};
    this.clicked = false;
    this.animationTime = 1500;
    this.refreshRate = 80;
    this.randomizeName = this.randomizeName.bind(this);
    this.myFirstName = "Leonard ";
    this.mySecondName = "Heininger";
    this.myreversename = this.mySecondName.split("").reverse().join("");
    this.switch = true;
  }
  
  componentDidMount() {
    this.randomizeName();
  }

  randomizeName() {
    this.setState({ active: "on" });
    this.time = 0;
    if (this.switch) {
      this.myFirstName = "Renaldo ";
      this.mySecondName = "HerGinnie";
      this.myreversename = this.mySecondName.split("").reverse().join("");
      this.switch = false;
    } else {
      this.myFirstName = "Leonard ";
      this.mySecondName = "Heininger";
      this.myreversename = this.mySecondName.split("").reverse().join("");
      this.switch = true;
    }
    this.alreadyUsedCharSurName = new Map();
    this.alreadyUsedCharName = new Map();
    if (!this.clicked)
      this.timerId = setInterval(() => this.tick(), this.refreshRate);
    this.clicked = true;
  }

  tick() {
    this.time += this.refreshRate;
    let randomFirstName = "<";
    for (let i = 0;
         i < (this.time / this.animationTime) * this.myFirstName.length; i++) {
      if (this.alreadyUsedCharSurName.get(i)) {
        randomFirstName += this.alreadyUsedCharSurName.get(i);
      } else {
        let char = this.randomstring[Math.round(
            Math.random() * (this.randomstring.length - 1))];
        randomFirstName += char;
        if (this.myFirstName.includes(char)) {
          this.alreadyUsedCharSurName.set(this.myFirstName.indexOf(char), char);
        }
      }
    }
    let randomSecondName = "";
    for (let i = 0;
         i < (this.time / this.animationTime) * this.mySecondName.length; i++) {
      if (this.alreadyUsedCharName.get(i)) {
        randomSecondName += this.alreadyUsedCharName.get(i);
      } else {
        let char = this.randomstring[Math.round(
            Math.random() * (this.randomstring.length - 1))];
        randomSecondName += char;
        if (this.myreversename.includes(char)) {
          this.alreadyUsedCharName.set(this.myreversename.indexOf(char), char);
        }
      }
    }
    randomSecondName = randomSecondName.split("").reverse().join("");
    randomFirstName += randomSecondName + ">";

    this.setState({name : randomFirstName});
    if (this.time >= this.animationTime) {
      clearInterval(this.timerId);
      this.setState({ active: "off", name : " " + this.myFirstName + this.mySecondName + " "});
      this.clicked = false;
    }
  }

  render() {
    return (
        <div id = "nameWrapper" className={`${this.state.active === "on" ? "animate-on" : "animate-off"}`}>
          <h1 onClick = {this.randomizeName} onMouseLeave =
             {() => globalstateobj.mouseToRed = false} onMouseOver =
                 {() => globalstateobj.mouseToRed = true} className = "name">{
            this.state.name}
          </h1>
        </div>);
  }
}
export default Name;
