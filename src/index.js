import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { fetchExerises, getAllPrograms } from './actions'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';



import React from "react";
import ReactDOM from "react-dom";
import {MainPage} from './components'

import rootReducer from './reducers'

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
const theme = createMuiTheme();

store.dispatch(fetchExerises())
store.dispatch(getAllPrograms())
ReactDOM.render(
        <Provider store={store} >
            <MainPage />
        </Provider>,
     document.getElementById("root"))
