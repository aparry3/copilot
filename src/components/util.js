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
export const Logo = (props) => {
    return (
        <div id="logo-container">
            <svg height="100%" viewBox="0 0 688 705" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="logo" fill="#FFFFFF">
                        <path d="M680.394643,234.821359 C666.335386,248.465145 646.271963,257 624,257 C602.664781,257 583.356229,249.167988 569.410907,236.515537 C554.922761,182.285269 534.502372,142.354951 521.854809,137.812017 C503.850847,131.345093 405.502405,140.8263 320.756862,188.540339 C234.508975,237.100239 162,324.228467 162,354.878145 C162,384.705913 229.927438,468.180774 316.466136,515.078024 C406.225067,563.72039 515.047565,575.095339 534.396091,564.805375 C550.064329,556.472668 570.910412,502.416574 580.787175,435.968191 C593.108044,428.414146 607.982904,424 624,424 C650.442063,424 673.771129,436.030116 687.635436,454.357267 C674.26889,577.856008 635.755287,683.629 607.536496,698.616025 C575.970816,715.380585 398.435013,696.848352 252,617.599494 C110.818557,541.193804 5.68434189e-14,405.195332 5.68434189e-14,356.599494 C5.96894017e-14,306.664588 118.292994,164.713997 259,85.5994935 C397.256043,7.86307827 557.704204,-7.58384287 587.076327,2.95216399 C612.93599,12.2282244 658.713561,112.06175 680.394643,234.821359 Z" id="Oval-2" transform="translate(343.817718, 352.142435) scale(-1, 1) translate(-343.817718, -352.142435) "></path>
                    </g>
                </g>
            </svg>
        </div>
    )
}
