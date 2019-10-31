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
const light_theme = createMuiTheme();
const dark_theme = createMuiTheme({
    palette: {
        primary: {main:'#2866ab', dark:'#20344a'},
        secondary: {main:'#BA833B'},
        background: {
            dark: '#121212',
            mediumDark: '#2e343c',
            main: '#3a4049',
            light: '#505861',
            tooltip: '#cbcdd0'
        }
    },
    accents: {
        primary: '#89cc75',
        secondary: '#ceb15c',
        error: '#c77272'
    },
    text: {
        primary: '#dddddd',
        secondary: '#707275',
        accents: {
            error: '#6f1f1f'
        }
    }
})


function App(props) {

    useEffect(() => {
        store.dispatch(fetchExerises())
        store.dispatch(fetchUser());
    })
    return (
        <Provider store={store} >
            <ThemeProvider theme={dark_theme} >
                <MainPage />
            </ThemeProvider>
        </Provider>
    )

}


ReactDOM.render(<App />,
     document.getElementById("root"))
