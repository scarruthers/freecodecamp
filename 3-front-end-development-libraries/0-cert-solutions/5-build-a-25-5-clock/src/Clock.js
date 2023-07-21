import React from 'react';

import './Clock.css'

const RESET = {
    breakLength: 5,
    sessionLength: 1,
    clockMinutes: 0,
    clockSeconds: 0,
    started: false,
    running: false
}

class Clock extends React.Component {
    constructor(props) {
        super(props)

        this.state = RESET;

        this.clockTick = this.clockTick.bind(this);
        this.resetClock = this.resetClock.bind(this);
        this.toggleClock = this.toggleClock.bind(this);
        this.updateLength = this.updateLength.bind(this);
    }

    componentDidMount() {
        setInterval(this.clockTick, 1000)
    }

    clockTick() {
        let args = {}

        if(this.state.running) {
            // update minutes and seconds
            if(this.state.clockSeconds === 0) {
                if(this.state.clockMinutes === 0) {
                    // Clock out of time
                    args.running = false;
                    alert('DONE')
                    // TODO: other handling
                } else {
                    args.clockMinutes = this.state.clockMinutes - 1;
                    args.clockSeconds = 59;
                }

            } else {
                args.clockSeconds = this.state.clockSeconds - 1;
            }

            this.setState(args)
        }
    }

    resetClock() {
        this.setState(RESET)
    }

    toggleClock() {
        let args = {};

        // First time hitting play, initialize the clock
        if(this.state.started === false) {
            args.clockMinutes = this.state.sessionLength;
        }

        args.started = true;
        args.running = !this.state.running;

        this.setState(args)
    }

    renderClock(minutes, seconds) {
        return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
    }

    updateLength(type, value) {
        let newValue;

        switch(type) {
            case "break":
                newValue = this.state.breakLength + value;
                this.setState({
                    breakLength: (newValue > 0 && newValue <= 60 ? newValue : this.state.breakLength)
                })
                break;
            case "session":
                newValue = this.state.sessionLength + value;
                this.setState({
                    sessionLength: (newValue > 0 && newValue <= 60 ? newValue : this.state.sessionLength)
                })
                break;

            default:
                console.error("No valid type selected.")
                break;
        }
    }

    render() {
        return (
            <div id="clock-container">
                <h1>Clock</h1>
                <div id="break">
                    <p id="break-label">Break Length</p>
                    <p id="break-length">{this.state.breakLength}</p>
                    <button type="button" id="break-increment" onClick={() => { this.updateLength("break", 1) }}>+</button>
                    <button type="button" id="break-decrement" onClick={() => { this.updateLength("break", -1) }}>-</button>
                </div>
                <div id="session">
                    <p id="session-label">Session Length</p>
                    <p id="session-length">{this.state.sessionLength}</p>
                    <button type="button" id="session-increment" onClick={() => { this.updateLength("session", 1) }}>+</button>
                    <button type="button" id="session-decrement" onClick={() => { this.updateLength("session", -1) }}>-</button>
                </div>
                <div id="timer">
                    <p id="time-left">{this.renderClock(this.state.clockMinutes, this.state.clockSeconds)}</p>
                </div>

                <div>
                    <button type="button" id="start_stop" onClick={this.toggleClock}>{this.state.running ? "Pause" : "Play"}</button>
                    <button type="button" id="reset" onClick={this.resetClock}>Reset</button>
                </div>
            </div>
        )
    }
}

export default Clock;