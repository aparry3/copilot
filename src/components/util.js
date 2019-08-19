import React from "react";

export function titleCase(str) {
  return str.replace(/\b[a-zA-Z]/g, function(t) { return t.toUpperCase() });
}

export function normalize(str) {
  return str.replace(/-|_|\./g, ' ');
}


export class InputLabel extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.onChange(this.props.name, e.target.value)
    }

    render() {
        return (
                <input
                    className="form-control"
                    type={this.props.input_type}
                    value={this.props.value}
                    name={this.props.name}
                    onChange={this.handleChange}
                    ref={this.inputRef}/>

        );
    }
}
