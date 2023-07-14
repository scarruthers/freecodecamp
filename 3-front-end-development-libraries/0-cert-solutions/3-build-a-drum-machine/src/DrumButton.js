import React from "react";

class DrumButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <button className="button btn-primary">{this.props.keybind}</button>
        )
    }
}

export default DrumButton;