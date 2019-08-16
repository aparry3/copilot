import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.scss';

import React from "react";
import ReactDOM from "react-dom";
import {MainPage} from './components'

ReactDOM.render(<MainPage />, document.getElementById("root"))
