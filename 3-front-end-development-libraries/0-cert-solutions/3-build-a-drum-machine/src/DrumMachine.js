import React from "react";

import './DrumMachine.css';

const AUDIO = [
    {
        key: "Q",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
        description: "Heater Type #1",
        keycode: 81
    },
    {
        key: "W",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
        description: "Heater Type #2",
        keycode: 87
    },
    {
        key: "E",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
        description: "Heater Type #1",
        keycode: 69
    },
    {
        key: "A",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
        description: "Heater Type #4",
        keycode: 65
    },
    {
        key: "S",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
        description: "Clap",
        keycode: 83
    },
    {
        key: "D",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
        description: "Open-HH",
        keycode: 68
    },
    {
        key: "Z",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
        description: "Kick 'N Hat",
        keycode: 90
    },
    {
        key: "X",
        url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
        description: "Kick",
        keycode: 88
    },
    {
        key: "C",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
        description: "Close-HH",
        keycode: 67
    }
]


class DrumMachine extends React.Component {
    constructor(props) {
        super(props)

        this.state = { displayText: "Click a button!" }

        this.playSound = this.playSound.bind(this);
        this.keyHandler = this.keyHandler.bind(this);
    }

    // Trigger audio and update #display with the audio description
    playSound(key, description) {
        document.getElementById(key).play();

        this.setState({
            displayText: description
        })
    }

    // Check if the pressed key matches anything in our AUDIO array
    keyHandler(event) {
        AUDIO.forEach(element => {
            if (event.key.toUpperCase() === element.key) {
                this.playSound(element.key, element.description);
            }
        });
    }

    // Wait for mount so we can safely add event handler to look for matching keypresses
    componentDidMount() {
        document.addEventListener("keydown", (event) => this.keyHandler(event));
    }

    render() {
        return (
            <div id="drum-machine">
                <h1>DRUM MACHINE</h1>
                <div id="display">{this.state.displayText}</div>
                <div id="key-container">
                    {
                        AUDIO.map(audioInstance => (
                            <button type="button" className="button btn-primary drum-pad" onClick={() => this.playSound(audioInstance.key, audioInstance.description)} name={audioInstance.key}>
                                <audio id={audioInstance.key} className="clip">
                                    <source src={audioInstance.url} type="audio/mpeg" />
                                </audio>
                                {audioInstance.key}
                            </button>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default DrumMachine;