import React from "react";

import './JavascriptCalculator.css'

const CONTAINER = "calculator-container";
const RESET = {
    display: 0,
    displayLog: "",
    previousNumber: null,
    previousOperator: null,
    lastButtonPushed: null,
    debugMessage: "No error yet."
}

const OPERATORS = {
    ADD: "+",
    SUBTRACT: "-",
    MULTIPLY: "*",
    DIVIDE: "/"
}

class JavascriptCalculator extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = RESET;
        this.resetCalculator = this.resetCalculator.bind(this);
    }

    componentDidMount() {
        this.addListener("#" + CONTAINER);
    }

    addListener(selector) {
        const calculator = document.querySelector(selector);

        calculator.addEventListener('click', e => {
            if(e.target.type === "button") {
                const datatype = e.target.dataset.type;
                const value = e.target.value; // is a string

                console.log(value, datatype)

                switch(datatype) {
                    case "clear":
                        // call reset calculator
                        this.resetCalculator();
                    break;

                    
                    case "numeral":
                        // TODO: if lastButtonPushed was equals and now it's a numeral, then we're starting a new calculation
                        if(this.state.lastButtonPushed === "equals") {
                            this.resetCalculator();
                        }

                        let newValue;

                        if(this.state.display === 0 || this.state.lastButtonPushed === "operator") {
                            // Don't append, directly update value
                            newValue = value;
                        } else {
                            // Append to existing numeral
                            newValue = this.state.display + value; // string we need to update to number for calculate()
                        }

                        this.setState({
                            display: parseFloat(newValue), // value passed from button is a string, parse to float in case of existing decimal points
                            displayLog: this.state.displayLog + value,
                            lastButtonPushed: datatype
                        })
                    break;

                    case "operator":
                        if(this.state.lastButtonPushed === "operator") {
                            // do nothing, unless the just pressed operator is a negative sign, in which case set display to start with a negative sign
                            if(value === OPERATORS.SUBTRACT) {
                                this.setState({
                                    debugMessage: "In subtract / negative checking state."
                                })
                            }
                        } else if(this.state.previousOperator === null) {
                            // set previous number and previousOperator to current values
                            this.setState({
                                displayLog: this.state.displayLog + value,
                                previousNumber: this.state.display,
                                previousOperator: value,
                                lastButtonPushed: datatype
                            })
                        } else {
                            const result = this.calculate(this.state.previousNumber, this.state.previousOperator, this.state.display);
                            this.setState({
                                display: result,
                                displayLog: this.state.displayLog + value, // string concat
                                previousNumber: result, // should be a number
                                previousOperator: value,
                                lastButtonPushed: datatype
                            })
                        }
                    break;

                    case "equals":
                        // Only state to calculate is after a number has been entered
                        // TODO add check to see if previousNumber, previousOperator are set
                        if(this.state.lastButtonPushed === "numeral") {
                            let result = this.calculate(this.state.previousNumber, this.state.previousOperator, this.state.display);
                            this.setState({
                                display: result,
                                displayLog: this.state.displayLog + value + result,
                                previousNumber: result,
                                previousOperator: null,
                                lastButtonPushed: datatype
                            });
                        } else {
                            this.setState({
                                debugMessage: "Error when hitting equals button, last button hit was not a numeral"
                            })
                        }

                    break;

                    case "decimal":

                        // if last button pushed was an operator, set display to "0."
                        if(this.state.lastButtonPushed === "operator") {
                            this.setState({
                                display: "0" + value,
                                displayLog: this.state.displayLog + value,
                                lastButtonPushed: datatype
                            })
                        } else if(Number.isInteger(this.state.display)) {
                            // Number is an integer (has no decimal), so go ahead and append a decimal point
                            this.setState({
                                display: this.state.display + value, // converts display to string, e.g. "1."
                                displayLog: this.state.displayLog + value,
                                lastButtonPushed: datatype
                            })
                        } else {
                            // do nothing, the number already has a decimal point
                        }
                    break;

                    default:

                    break;
                }
            }
        })
    }

    calculate(previousNumber, operator, currentNumber) {
        // make sure we can deal with floats.
        // may need a new function that formats / cleans floats, or any / all numbers for us

        previousNumber = parseFloat(previousNumber);
        currentNumber = parseFloat(currentNumber);

        switch(operator) {
            case OPERATORS.DIVIDE:
                return previousNumber / currentNumber;
            break;

            case OPERATORS.MULTIPLY:
                return previousNumber * currentNumber;
            break;

            case OPERATORS.SUBTRACT:
                return previousNumber - currentNumber;
            break;

            case OPERATORS.ADD:
                return previousNumber + currentNumber;
            break;

            default:
                return "error: " + operator + " is not a valid operator";
            break;
        }

    }

    resetCalculator() {
        this.setState(RESET);
    }

    render() {
        const buttonClass = "col btn btn-dark btn-outline-danger border-2 calcButton";

        return (
            <div>
                <div id="debug">
                    <p>previousNumber: {this.state.previousNumber}, {typeof this.state.previousNumber}</p>
                    <p>previousOperator: {this.state.previousOperator}</p>
                    <p>lastButtonPushed: {this.state.lastButtonPushed}</p>
                    <p>debugMessage: {this.state.debugMessage}</p>
                </div>
                <div id={CONTAINER}>
                    <div className="row">
                        <p id="displayLog">{this.state.displayLog}</p>
                        <p id="display">{this.state.display}</p>
                    </div>

                    <div className="row row-cols-4">
                        <div><button type="button" className={buttonClass} data-type="numeral" value="7" id="seven">7</button></div>
                        <div><button type="button" className={buttonClass} data-type="numeral" value="8" id="eight">8</button></div>
                        <div><button type="button" className={buttonClass} data-type="numeral" value="9" id="nine">9</button></div>
                        <div><button type="button" className={buttonClass} data-type="operator" value={OPERATORS.DIVIDE} id="divide">{OPERATORS.DIVIDE}</button></div>
                    </div>
                    <div className="row row-cols-4">
                        <div><button type="button" className={buttonClass} data-type="numeral" value="4" id="four">4</button></div>
                        <div><button type="button" className={buttonClass} data-type="numeral" value="5" id="five">5</button></div>
                        <div><button type="button" className={buttonClass} data-type="numeral" value="6" id="six">6</button></div>
                        <div><button type="button" className={buttonClass} data-type="operator" value={OPERATORS.MULTIPLY} id="multiply">{OPERATORS.MULTIPLY}</button></div>
                    </div>
                    <div className="row row-cols-4">
                        <div><button type="button" className={buttonClass} data-type="numeral" value="1" id="one">1</button></div>
                        <div><button type="button" className={buttonClass} data-type="numeral" value="2" id="two">2</button></div>
                        <div><button type="button" className={buttonClass} data-type="numeral" value="3" id="three">3</button></div>
                        <div><button type="button" className={buttonClass} data-type="operator" value={OPERATORS.SUBTRACT} id="subtract">{OPERATORS.SUBTRACT}</button></div>
                    </div>
                    <div className="row row-cols-4">
                        <div><button type="button" className={buttonClass} data-type="clear" value="clear" id="clear" onClick={this.resetCalculator}>C</button></div>
                        <div><button type="button" className={buttonClass} data-type="numeral" value="0" id="zero">0</button></div>
                        <div><button type="button" className={buttonClass} data-type="decimal" value="." id="decimal">.</button></div>
                        <div><button type="button" className={buttonClass} data-type="operator" value={OPERATORS.ADD} id="add">{OPERATORS.ADD}</button></div>
                    </div>
                    <div className="row">
                        <div>
                            <button type="button" className="btn btn-dark" data-type="equals" value="=" id="equals">=</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default JavascriptCalculator;