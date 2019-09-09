import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { fetchExerises, getAllPrograms, fetchUser } from './actions'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';




import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import {MainPage} from './components'

import rootReducer from './reducers'
import {auth0_client} from './auth'


const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
const theme = createMuiTheme();


function App(props) {

    useEffect(() => {
        store.dispatch(fetchExerises())
        store.dispatch(fetchUser());
    })
    return (
        <Provider store={store} >
            <MainPage />
        </Provider>
    )

}


ReactDOM.render(<App />,
     document.getElementById("root"))
