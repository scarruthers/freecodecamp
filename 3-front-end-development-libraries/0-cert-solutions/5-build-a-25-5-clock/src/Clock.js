import React from 'react';

import './Clock.css'

const RESET = {
    breakLength: 5,
    sessionLength: 25,
    clockMinutes: 25,
    clockSeconds: 0,
    clockState: "session",
    started: false,
    running: false
}

class Clock extends React.Component {
    constructor(props) {
        super(props)

        this.state = RESET;
        this.tickHandler = null;

        this.clockTick = this.clockTick.bind(this);
        this.resetClock = this.resetClock.bind(this);
        this.toggleClock = this.toggleClock.bind(this);
        this.updateLength = this.updateLength.bind(this);
    }

    componentDidMount() {
        this.beepControl = document.getElementById("beep");
    }

    playBeep() {
        this.beepControl.volume = .2;
        this.beepControl.play();
    }

    resetBeep() {
        this.beepControl.pause();
        this.beepControl.fastSeek(0);
    }

    clockTick() {
        let args = {}

        if(this.state.running) {
            // update minutes and seconds
            if(this.state.clockSeconds === 0) {
                if(this.state.clockMinutes === 0) {
                    // When we hit 0 minutes 0 seconds, start a new timer.
                    // If previous timer was a session, start a break timer, otherwise start a new session timer
                    if(this.state.clockState === "session") {
                        args.clockState = "break";
                        args.clockMinutes = this.state.breakLength;
                    } else {
                        args.clockState = "session";
                        args.clockMinutes = this.state.sessionLength;
                    }
                    // seconds are already at zero, and clock is already running
                    this.playBeep();
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
        this.resetBeep();
        clearInterval(this.tickHandler);
    }

    toggleClock() {
        let args = {
            started: true,
            running: !this.state.running
        };

        this.setState(args)

        if(!this.state.running) {
            // Start clock
            this.tickHandler = setInterval(this.clockTick, 1000);
        } else {
            // Stop clock
            clearInterval(this.tickHandler);
        }
    }

    renderClock(minutes, seconds) {
        return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
    }

    updateLength(type, value) {
        let newLength;

        switch(type) {
            case "break":
                newLength = this.state.breakLength + value;
                this.setState({
                    breakLength: (newLength > 0 && newLength <= 60 ? newLength : this.state.breakLength)
                })
                break;
            case "session":
                newLength = this.state.sessionLength + value;
                let newSessionLength = (newLength > 0 && newLength <= 60 ? newLength : this.state.sessionLength);
                this.setState({
                    sessionLength: newSessionLength,
                    // If timer hasn't started, update the countdown clock as well
                    clockMinutes: (this.state.started ? this.state.clockMinutes : newSessionLength)
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
                <h1>Pomodoro Clock</h1>
                <div className="row">
                    <div id="break" className="col">
                        <p id="break-label">Break Length:</p>
                        <p><span id="break-length">{this.state.breakLength}</span> min
                            <span className="break-buttons">
                                <button type="button" id="break-increment" className="btn btn-dark" onClick={() => { this.updateLength("break", 1) }}><i className="fa-solid fa-plus"></i></button>
                                <button type="button" id="break-decrement" className="btn btn-dark" onClick={() => { this.updateLength("break", -1) }}><i className="fa-solid fa-minus"></i></button>
                            </span>
                        </p>
                    </div>
                    <div id="session" className="col">
                        <p id="session-label">Session Length:</p>
                        <p><span id="session-length">{this.state.sessionLength}</span> min
                            <span className="break-buttons">
                                <button type="button" id="session-increment" className="btn btn-dark" onClick={() => { this.updateLength("session", 1) }}><i className="fa-solid fa-plus"></i></button>
                                <button type="button" id="session-decrement" className="btn btn-dark" onClick={() => { this.updateLength("session", -1) }}><i className="fa-solid fa-minus"></i></button>
                            </span>
                        </p>
                    </div>
                </div>
                <div id="timer">
                    <p id="timer-label">{this.state.clockState} time remaining:</p>
                    <h1 id="time-left">{this.renderClock(this.state.clockMinutes, this.state.clockSeconds)}</h1>

                    <div id="controls">
                        <button type="button" id="start_stop" className="btn btn-success" onClick={this.toggleClock}>{this.state.running ? <i className="fa-solid fa-pause"></i> : <i className='fa-solid fa-play'></i>}</button>
                        <button type="button" id="reset" className="btn btn-secondary" onClick={this.resetClock}><i className="fa-solid fa-arrow-rotate-left"></i></button>
                    </div>
                </div>


                <audio id="beep" src="https://github.com/scarruthers/freecodecamp/raw/main/3-front-end-development-libraries/0-cert-solutions/5-build-a-25-5-clock/public/beep.mp3"></audio>
            </div>
        )
    }
}

export default Clock;