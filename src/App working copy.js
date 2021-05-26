import './App.css';
import React from "react"
import { create, all } from "mathjs"

const config = {
  matrix: 'Array', // Choose 'Matrix' (default) or 'Array'
  precision: 4,
  number: "BigNumber"
};

const math = create(all, config);

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      dispInput: "",
      inputFirstVal: "",
      inputSecondVal: ""
    }
    // binds etc, this.toggleDisplay = this.toggleDisplay.bind(this);
    this.addDigit.bind(this);
    this.clear.bind(this);
    this.mathWork.bind(this);
    this.addButton.bind(this);
    this.pushMath.bind(this);
  }
  // declare functions here, bind above

  addDigit (digit) {
    let lastItem = this.state.dispInput[this.state.dispInput.length - 1];
    if (this.state.dispInput.length < 1 && (digit === "/" || digit === "*" || digit === "+" || digit === "=" || digit === "0")) {
      return;
    } else if ((this.state.dispInput.length === 1) && (lastItem === "-") && (digit === "/" || digit === "*" || digit === "+" || digit === "=")) {
       return;    
    } else if ((this.state.dispInput.length === 1) && (lastItem === "-") && (digit === "-")) {
      this.setState(({dispInput: ""}));
    } else if ((lastItem === "/" || lastItem === "*" || lastItem === "-" || lastItem === "+" || lastItem === ".") && (digit === "/" || digit === "*" || digit === "-" || digit === "+" || digit === ".")) {
      //let dispInputSnipped = this.state.dispInput.slice(0,this.state.dispInput.length - 1).concat(digit);
      this.setState(({dispInput: this.state.dispInput.slice(0,this.state.dispInput.length - 1).concat(digit)}));
      return;
    } else if (/\d+\.\d+/g.test(this.state.dispInput) && digit === ".") {
      return;
    }
    
    
    
    
    
    
    
    
    
    else {
      this.setState(({dispInput: this.state.dispInput.concat([digit])}));
    }
  }

  clear () {
    this.setState(({value: 0}));
    this.setState(({dispInput: ""}));
  }
  
  mathWork () {
    let lastItem = this.state.dispInput[this.state.dispInput.length - 1];
    if (this.state.dispInput.length < 3) {
      return;
    } else if (lastItem === "+" || lastItem === "-" || lastItem === "*" || lastItem === "/" || lastItem === ".") {
      let sliced = this.state.dispInput.slice(0,this.state.dispInput.length - 1)
      this.setState({dispInput: sliced},() => {this.pushMath()});
    } else {
      this.pushMath();
    }
  }

  pushMath () {
    let answer = math.evaluate(this.state.dispInput).toString();
    this.setState(({value: answer}));
    this.setState(({dispInput: answer}));
  }

  /*
  pushMath () {
    let answer = math.evaluate(this.state.dispInput);
    this.setState(({value: answer}));
    let stringedAnswer = answer.toString();
    this.setState(({dispInput: stringedAnswer}));
  }
  */

  addButton () {
    this.addDigit("+");
  }

  /*
  <textarea id="displayInputs" readOnly value={this.state.dispInput}></textarea>
        <textarea id="display" readOnly value={this.state.value}></textarea>
  */
  /*
  <div id="displayInputs">{this.state.dispInput}</div>
        <div id="display">{this.state.value}</div>
  */



  render() {
    return (
      <div id="calc-body">
        <div id="displayInputs">{this.state.dispInput}</div>
        <div id="display">{this.state.value}</div>
        <button onClick={() => {this.clear()}} id="clear">AC</button>
        <button onClick={() => {this.addDigit("/")}} id="divide">/</button>
        <button onClick={() => {this.addDigit("*")}} id="multiply">*</button>
        <button onClick={() => {this.addDigit("-")}} id="subtract">-</button>
        <button onClick={() => {this.addDigit("+")}} id="add">+</button>
        <button onClick={() => {this.addDigit(".")}} id="decimal">.</button>
        <button onClick={() => {this.mathWork()}} id="equals">=</button>
        <button onClick={() => {this.addDigit("1")}} id="one">1</button>
        <button onClick={() => {this.addDigit("2")}} id="two">2</button>
        <button onClick={() => {this.addDigit("3")}} id="three">3</button>
        <button onClick={() => {this.addDigit("4")}} id="four">4</button>
        <button onClick={() => {this.addDigit("5")}} id="five">5</button>
        <button onClick={() => {this.addDigit("6")}} id="six">6</button>
        <button onClick={() => {this.addDigit("7")}} id="seven">7</button>
        <button onClick={() => {this.addDigit("8")}} id="eight">8</button>
        <button onClick={() => {this.addDigit("9")}} id="nine">9</button>
        <button onClick={() => {this.addDigit("0")}} id="zero">0</button>
      </div>
    );
  } // render
}; // class Calculator

export default Calculator;