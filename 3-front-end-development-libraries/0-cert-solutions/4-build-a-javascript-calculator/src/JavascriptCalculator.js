import React from "react";

import './JavascriptCalculator.css'

const CONTAINER = "calculator-container";

// default state, also used to reset calculator
const RESET = {
    display: 0,
    displayLog: "0",
    previousNumber: null,
    previousOperator: null,
    lastButtonPushed: null,
    debugMessage: "No error yet.",
    eventTracker: ""
}

const OPERATORS = {
    ADD: "+",
    SUBTRACT: "-",
    MULTIPLY: "*",
    DIVIDE: "/"
}

// map keyboard to calculator button IDs
const KEYS = {
    "0": "zero",
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine",
    "/": "divide",
    "*": "multiply",
    "-": "subtract",
    "+": "add",
    "Escape": "clear",
    "Backspace": "clear",
    ".": "decimal",
    "Enter": "equals"
}

class JavascriptCalculator extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = RESET;

        this.resetCalculator = this.resetCalculator.bind(this);
        this.addKeydownListener = this.addKeydownListener.bind(this);
        this.addClickListener = this.addClickListener.bind(this);
    }

    componentDidMount() {
        // Add our click and keydown listeners
        this.addKeydownListener();
        this.addClickListener();
    }

    resetCalculator(callbackFN = null) {
        if(typeof callbackFN === "function") {
            this.setState(RESET, callbackFN);
        } else {
            this.setState(RESET);
        }
    }
    
    clickButton(key) {
        if(Object.keys(KEYS).includes(key)) {
            let buttonID = KEYS[key];
            document.getElementById(buttonID).click();
        }
    }

    addKeydownListener() {
        document.addEventListener('keydown', e => {
            this.clickButton(e.key);
        });
    }
    
    addClickListener() {
        const CALCULATOR = document.getElementById(CONTAINER);

        CALCULATOR.addEventListener('click', e => {
            if(e.target.type === "button") {
                const datatype = e.target.dataset.type;
                const value = e.target.value; // is a string

                switch(datatype) {

                    case "clear":
                        this.resetCalculator();
                        break;
                    
                    case "numeral":
                        // if lastButtonPushed was equals and now it's a numeral, start a new calculation
                        // reset the state and on callback click the button again
                        if(this.state.lastButtonPushed === "equals") {
                            this.resetCalculator(() => {
                                    this.clickButton(value)
                            });
                        } else {
                            let newDisplay, newDisplayLog;
    
                            // value passed from button is a string, parse to float in case of existing decimal points
                            if(this.state.display === 0) {
                                // Don't append, directly update value
                                newDisplay = parseFloat(value);
                                newDisplayLog = value;
                            } else if(this.state.lastButtonPushed === "operator") {
                                // check if last operator was simply a negative sign
                                if(this.state.display === "-") {
                                    newDisplay = this.state.display + value;
                                } else {
                                    newDisplay = parseFloat(value);
                                }
                                newDisplayLog = this.state.displayLog + value;
                            } else {
                                // Append to existing numeral
                                newDisplay = this.state.display + value; // string we need to update to number for calculate()
                                newDisplayLog = this.state.displayLog + value;
                            }
    
                            this.setState({
                                display: newDisplay, 
                                displayLog: newDisplayLog,
                                lastButtonPushed: datatype
                            })
                        }

                        break;

                    case "operator":
                        let setArgs;

                        if(this.state.lastButtonPushed === "operator") {

                            if(value === OPERATORS.SUBTRACT) {
                                // set display to start with a negative sign
                                setArgs = {
                                    display: value,
                                    displayLog: (this.state.display === value ? this.state.displayLog : this.state.displayLog + value),
                                    previousOperator: this.state.previousOperator // maintain previous operator state
                                }
                            } else {
                                // Override previous operator
                                setArgs = {
                                    displayLog: this.state.displayLog.slice(0, this.state.displayLog.length-1) + value,
                                    lastButtonPushed: datatype,
                                    previousOperator: value
                                }

                                // Revert state back to before negative sign was entered
                                if(this.state.display === OPERATORS.SUBTRACT) {
                                    setArgs.display = this.state.previousNumber;
                                }
                            }
                        } else if(this.state.previousOperator === null) {
                            // set previous number and previousOperator to current values
                            setArgs = {
                                displayLog: this.state.displayLog + value,
                                previousNumber: this.state.display
                            }
                        } else {
                            const result = this.calculate(this.state.previousNumber, this.state.previousOperator, this.state.display);
                            setArgs = {
                                display: result,
                                displayLog: this.state.displayLog + value, // string concat
                                previousNumber: result // should be a number
                            }
                        }
                        
                        let defaultArgs = {
                            previousOperator: value,
                            lastButtonPushed: datatype
                        }

                        // Combine our default and calculated arguments, overriding default with anything we set
                        this.setState({
                            ...defaultArgs,
                            ...setArgs
                        })

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
                                displayLog: this.state.displayLog + "0" + value,
                                lastButtonPushed: datatype
                            })
                        } else if(Number.isInteger(this.state.display) || !this.state.display.includes(".")) {
                            // Number is an integer (has no decimal), so go ahead and append a decimal point
                            this.setState({
                                display: this.state.display + value, // converts display to string, e.g. "1."
                                displayLog: this.state.displayLog + value,
                                lastButtonPushed: datatype
                            })
                        } else {
                            // do nothing, the number already has a decimal point
                            this.setState({
                                eventTracker: "decimal error"
                            })
                        }
                        break;

                    default:
                        console.error("Unknown operator.");
                        break;
                }
            }
        })
    }

    calculate(previousNumber, operator, currentNumber) {
        let result;

        // make sure we explicitly convert to floats in case a string gets passed in
        previousNumber = parseFloat(previousNumber);
        currentNumber = parseFloat(currentNumber);

        switch(operator) {
            case OPERATORS.DIVIDE:
                result = previousNumber / currentNumber;
                break;

            case OPERATORS.MULTIPLY:
                result = previousNumber * currentNumber;
                break;

            case OPERATORS.SUBTRACT:
                result = previousNumber - currentNumber;
                break;

            case OPERATORS.ADD:
                result = previousNumber + currentNumber;
                break;

            default:
                result = "error: " + operator + " is not a valid operator";
                break;
        }

        return result;
    }

    render() {
        const buttonClass = "col btn btn-dark border-2 calcButton";
        const numeralClass = "col btn btn-warning btn-outline-dark border-2 calcButton";
        const operatorClass = "col btn btn-danger btn-outline-dark border-2 calcButton";

        return (
            <div id={CONTAINER}>

                <div className="row">
                    <p id="displayLog">{this.state.displayLog}</p>
                    <p id="display">{this.state.display}</p>
                </div>

                <div className="row row-cols-4">
                    <div><button type="button" className={numeralClass} data-type="numeral" value="7" id="seven">7</button></div>
                    <div><button type="button" className={numeralClass} data-type="numeral" value="8" id="eight">8</button></div>
                    <div><button type="button" className={numeralClass} data-type="numeral" value="9" id="nine">9</button></div>
                    <div><button type="button" className={operatorClass} data-type="operator" value={OPERATORS.DIVIDE} id="divide">{OPERATORS.DIVIDE}</button></div>
                </div>

                <div className="row row-cols-4">
                    <div><button type="button" className={numeralClass} data-type="numeral" value="4" id="four">4</button></div>
                    <div><button type="button" className={numeralClass} data-type="numeral" value="5" id="five">5</button></div>
                    <div><button type="button" className={numeralClass} data-type="numeral" value="6" id="six">6</button></div>
                    <div><button type="button" className={operatorClass} data-type="operator" value={OPERATORS.MULTIPLY} id="multiply">{OPERATORS.MULTIPLY}</button></div>
                </div>

                <div className="row row-cols-4">
                    <div><button type="button" className={numeralClass} data-type="numeral" value="1" id="one">1</button></div>
                    <div><button type="button" className={numeralClass} data-type="numeral" value="2" id="two">2</button></div>
                    <div><button type="button" className={numeralClass} data-type="numeral" value="3" id="three">3</button></div>
                    <div><button type="button" className={operatorClass} data-type="operator" value={OPERATORS.SUBTRACT} id="subtract">{OPERATORS.SUBTRACT}</button></div>
                </div>

                <div className="row row-cols-4">
                    <div><button type="button" className={buttonClass} data-type="clear" value="clear" id="clear">C</button></div>
                    <div><button type="button" className={numeralClass} data-type="numeral" value="0" id="zero">0</button></div>
                    <div><button type="button" className={buttonClass} data-type="decimal" value="." id="decimal">.</button></div>
                    <div><button type="button" className={operatorClass} data-type="operator" value={OPERATORS.ADD} id="add">{OPERATORS.ADD}</button></div>
                </div>

                <div className="row">
                    <div>
                        <button type="button" className="btn btn-dark btn-outline-info" data-type="equals" value="=" id="equals">=</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default JavascriptCalculator;