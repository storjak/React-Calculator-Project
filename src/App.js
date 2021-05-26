import './App.css';
import React from "react";
import { create, all } from "mathjs";

const config = {
  matrix: 'Array',
  precision: 4,
  number: "BigNumber"
};

const math = create(all, config);

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longInput: "",
      shortInput: "0",
      calculated: false
    }
    this.clear.bind(this);
    this.digitControl.bind(this);
    this.symbolReplacer.bind(this);
    this.mathWork.bind(this);
    this.pushMath.bind(this);
    this.addToBoth.bind(this);
    this.addSymbol.bind(this);
    this.removeFirstZero.bind(this);
    this.revertNegative.bind(this);
  }

  clear() {
    this.setState(({
      longInput: "",
      shortInput: "0",
      calculated: false
    }));
  }

  digitControl(digit) {
    let shortInputLength = this.state.shortInput.length;
    let longInputLength = this.state.longInput.length;
    let shortLastItem = this.state.shortInput[shortInputLength - 1];
    if (this.state.calculated) {
      if (digit === "=") {
        return;
      }
      if (digit === "+" || digit === "-" || digit === "*" || digit === "/") {
        this.setState({
          longInput: this.state.shortInput.concat(digit),
          shortInput: digit,
          calculated: false
        });
        return;
      } else if (digit === "0") {
        console.log("cleared")
        this.clear();
        return;
      } else if (digit !== "+" || digit !== "-" || digit !== "*" || digit !== "/") {
        this.setState({
          longInput: digit,
          shortInput: digit,
          calculated: false
        });
        return;
      }
    }
    // if calculated is true   /\
    // if calculated is false  \/
    else if (this.state.calculated === false) {
      const symbols = ["+", "-", "*", "/"], onlyNumbers = ["+", "-", "*", "/", ".", "0", "="];
      if (digit === "+") { //                                                             + control

        const minusCheck = ["*-", "/-"];
        if (longInputLength < 1 && shortInputLength <= 1) {
          return;
        } else if (shortLastItem === "+") {
          return;
        } else if (this.state.longInput.includes(minusCheck[0]) || this.state.longInput.includes(minusCheck[1])) {
          this.setState({
            longInput: this.state.longInput.slice(0, this.state.longInput.length - 2).concat(digit),
            shortInput: digit
          });
        } else if (this.state.shortInput === "-" && longInputLength <= 1) {
          this.revertNegative();
        } else if (shortLastItem === "-" && longInputLength > 1) {
          this.symbolReplacer(digit);
        } else if (symbols.includes(shortLastItem) && shortLastItem !== "-") {
          this.symbolReplacer(digit);
        } else if (!onlyNumbers.includes(shortLastItem)) {
          this.addSymbol(digit);
        } else {
          alert("+ button malfunction");
        }
      } else if (digit === "-") { //                                                      - control
        if (longInputLength < 1 && shortInputLength <= 1) {
          this.addSymbol(digit);
        } else if (shortLastItem === "-" && longInputLength <= 1) {
          this.revertNegative();
        } else if (shortLastItem === "-" && longInputLength > 1) {
          return;
        } else if (shortLastItem === "+") {
          this.symbolReplacer(digit);
        } else if (shortLastItem === "*" || shortLastItem === "/") {
          this.addSymbol(digit);
        } else if (!onlyNumbers.includes(shortLastItem)) {
          this.addSymbol(digit);
        } else if (shortInputLength > 1 && shortLastItem === "-") {
          return;
        } else {
          alert("- button malfunction");
        }
      } else if (digit === "*" || digit === "/") { //                                     * & / control

        if (longInputLength < 1 && shortInputLength <= 1) {
          return;
        } else if (this.state.shortInput === "-") {
          return;
        } else if (symbols.includes(shortLastItem) || shortLastItem === ".") {
          this.symbolReplacer(digit);
        } else if (!onlyNumbers.includes(shortLastItem) || (shortInputLength >= 2 && shortLastItem === "0")) {
          this.addSymbol(digit);
        } else {
          alert("* or / button malfunction");
        }
      } else if (digit === ".") { //                                                      . control

        if (this.state.shortInput.includes(".")) {
          return; // Do Nothing
        } else if (longInputLength < 1 && shortInputLength <= 1) {
          this.removeFirstZero(digit);
        } else {
          this.addToBoth(digit);
        }
      } else if (digit === "0") { //                                                      0 control

        if (longInputLength < 1 && shortInputLength <= 1) {
          return; // Do Nothing
        } else if (symbols.includes(shortLastItem)) {
          return; // Do Nothing
        } else {
          this.addToBoth(digit);
        }
      } else if (!onlyNumbers.includes(digit)) { //                                       1-9 control
        if (longInputLength < 1 && shortInputLength <= 1) {
          this.removeFirstZero(digit);
        } else if (symbols.includes(shortLastItem)) {
          if (shortLastItem === "-" && longInputLength <= 1) {
            this.addToBoth(digit);
            return;
          }
          this.addSymbol(digit);
        } else if (!onlyNumbers.includes(digit)) {
          this.addToBoth(digit);
        } else {
          alert("1 - 9 button malfunction")
        }
      } else if (digit === "=") { //                                                      = control
        if (longInputLength < 1 && shortInputLength <= 1) {
          return;
        } else {
          this.mathWork();
        }
      }
      else {
        alert("Something wrong happened.")
      }
    } // end of if calculated is false
  } // end of digitControl()

  revertNegative() {
    this.setState({
      longInput: this.state.longInput.slice(0, this.state.longInput.length - 1),
      shortInput: "0"
    });
  }

  addToBoth(digit) {
    this.setState({
      longInput: this.state.longInput.concat(digit),
      shortInput: this.state.shortInput.concat(digit)
    });
  }

  symbolReplacer(digit) {
    this.setState({
      longInput: this.state.longInput.slice(0, this.state.longInput.length - 1).concat(digit),
      shortInput: digit
    });
  }

  addSymbol(digit) {
    this.setState({
      longInput: this.state.longInput.concat(digit),
      shortInput: digit
    });
  }

  removeFirstZero(digit) {
    this.setState({
      longInput: this.state.longInput.concat(digit),
      shortInput: this.state.longInput.slice(0, this.state.longInput.length - 1).concat(digit)
    });
  }

  mathWork() {
    let longLastItem = this.state.longInput[this.state.longInput.length - 1];
    if (this.state.longInput.length < 3) {
      return;
    } else if (longLastItem === "+" || longLastItem === "-" || longLastItem === "*" || longLastItem === "/" || longLastItem === ".") {
      let sliced = this.state.longInput.slice(0, this.state.longInput.length - 1)
      this.setState({ longInput: sliced }, () => {
        this.pushMath()
      });
    } else {
      this.pushMath();
    }
  }

  pushMath() {
    let answer = math.evaluate(this.state.longInput).toString();
    this.setState({
      shortInput: answer,
      longInput: this.state.longInput + `=${answer}`,
      calculated: true
    });
  }

  render() {
    return (
      <div id="calc-body">
        <div id="displayInputs">{this.state.longInput}</div>
        <div id="display">{this.state.shortInput}</div>
        <button onClick={() => { this.clear() }} id="clear">AC</button>
        <button onClick={() => { this.digitControl("/") }} id="divide">/</button>
        <button onClick={() => { this.digitControl("*") }} id="multiply">*</button>
        <button onClick={() => { this.digitControl("-") }} id="subtract">-</button>
        <button onClick={() => { this.digitControl("+") }} id="add">+</button>
        <button onClick={() => { this.digitControl(".") }} id="decimal">.</button>
        <button onClick={() => { this.digitControl("=") }} id="equals">=</button>
        <button onClick={() => { this.digitControl("1") }} id="one">1</button>
        <button onClick={() => { this.digitControl("2") }} id="two">2</button>
        <button onClick={() => { this.digitControl("3") }} id="three">3</button>
        <button onClick={() => { this.digitControl("4") }} id="four">4</button>
        <button onClick={() => { this.digitControl("5") }} id="five">5</button>
        <button onClick={() => { this.digitControl("6") }} id="six">6</button>
        <button onClick={() => { this.digitControl("7") }} id="seven">7</button>
        <button onClick={() => { this.digitControl("8") }} id="eight">8</button>
        <button onClick={() => { this.digitControl("9") }} id="nine">9</button>
        <button onClick={() => { this.digitControl("0") }} id="zero">0</button>
      </div>
    );
  }
};

export default Calculator;