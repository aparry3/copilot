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


export const Wordmark = (props) => {
    return (
    <div id="logo-container">
        <svg width="113px" height="30px" viewBox="0 0 113 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Final-Rough-Draft" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Main-UI" transform="translate(-33.000000, -16.000000)" fill="#FFFFFF">
                    <g id="sidebar">
                        <g id="wordmark" transform="translate(33.000000, 14.000000)">
                            <g>
                                <g id="logo" transform="translate(0.000000, 2.000000)">
                                    <path d="M29.6683711,9.99239827 C29.0553221,10.5729849 28.1804635,10.9361702 27.2093023,10.9361702 C26.2789875,10.9361702 25.4370449,10.6028931 24.828964,10.0644909 C24.1972134,7.75681995 23.3067895,6.0576575 22.7552969,5.86434113 C21.9702404,5.5891529 17.6817909,5.99260849 13.9864911,8.02299316 C10.2256821,10.0893719 7.06395349,13.796956 7.06395349,15.1011976 C7.06395349,16.3704644 10.0259057,19.9225861 13.7993955,21.9182138 C17.7133023,23.9881017 22.4584694,24.4721421 23.3021551,24.0342713 C23.9853632,23.679688 24.8943494,21.3794287 25.3250222,18.5518379 C25.8622694,18.2303892 26.5108824,18.0425532 27.2093023,18.0425532 C28.3622993,18.0425532 29.379555,18.554473 29.9841033,19.3343518 C29.4012597,24.5896174 27.7218875,29.0905958 26.491417,29.7283415 C25.1150065,30.441727 17.3736198,29.6531214 10.9883721,26.2808295 C4.83220453,23.0295236 5.68434189e-14,17.2423546 5.68434189e-14,15.1744465 C5.6967517e-14,13.0495569 5.15812475,7.00910626 11.2936047,3.64253164 C17.3222112,0.334599075 24.3184973,-0.322716718 25.5992584,0.125623999 C26.72686,0.520349976 28.722975,4.7685851 29.6683711,9.99239827 Z" id="Oval-2" transform="translate(14.992052, 14.984784) scale(-1, 1) translate(-14.992052, -14.984784) "></path>
                                </g>
                                <text id="copilot" fontFamily="Quantico-Bold, Quantico" fontSize="20" fontWeight="bold" letterSpacing="1.08">
                                    <tspan x="41" y="21">copilot</tspan>
                                </text>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    </div>
    )
}
