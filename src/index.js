import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.scss';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { fetchExerises } from './actions'



import React from "react";
import ReactDOM from "react-dom";
import {MainPage} from './components'

import rootReducer from './reducers'

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

store.dispatch(fetchExerises())
ReactDOM.render(
    <Provider store={store} >
        <MainPage />
    </Provider>,
     document.getElementById("root"))
