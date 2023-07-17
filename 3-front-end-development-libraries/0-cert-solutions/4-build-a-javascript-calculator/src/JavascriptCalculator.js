import React from "react";

import './JavascriptCalculator.css'

class JavascriptCalculator extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            display: "0",
        }

        this.resetCalculator = this.resetCalculator.bind(this);
    }

    resetCalculator() {
        this.setState({
            display: "0"
        })
    }

    render() {
        const buttonClass = "col btn btn-dark btn-outline-danger"
        return (
            <div id="calculator-container" className="">
                <h1>Calculator</h1>
                <div class="row">
                    <p id="display">{this.state.display}</p>
                </div>

                <div class="row row-cols-4">
                    <button type="button" className={buttonClass} id="seven">7</button>
                    <button type="button" className={buttonClass} id="eight">8</button>
                    <button type="button" className={buttonClass} id="nine">9</button>
                    <button type="button" className={buttonClass} id="divide">/</button>
                </div>
                <div class="row row-cols-4">
                    <button type="button" className={buttonClass} id="four">4</button>
                    <button type="button" className={buttonClass} id="five">5</button>
                    <button type="button" className={buttonClass} id="six">6</button>
                    <button type="button" className={buttonClass} id="multiply">*</button>
                </div>
                <div class="row row-cols-4">
                    <button type="button" className={buttonClass} id="one">1</button>
                    <button type="button" className={buttonClass} id="two">2</button>
                    <button type="button" className={buttonClass} id="three">3</button>
                    <button type="button" className={buttonClass} id="add">+</button>

                </div>
                <div class="row row-cols-4">
                    <button type="button" className={buttonClass} id="clear" onClick={this.resetCalculator}>C</button>
                    <button type="button" className={buttonClass} id="zero">0</button>
                    <button type="button" className={buttonClass} id="decimal">.</button>
                    <button type="button" className={buttonClass} id="subtract">-</button>
                </div>
                <div class="row">
                    <button type="button" className="btn btn-dark" id="equals">=</button>
                </div>
            </div>
        )
    }
}



export default JavascriptCalculator;