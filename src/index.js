import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { fetchExerises, fetchUser } from './actions'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {API_URI} from './config'




import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import {MainPage} from './components'

import rootReducer from './reducers'
import {auth0_client} from './auth'


const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
const dark_theme = createMuiTheme({
    palette: {
        primary: {main:'#20344a', dark: '#17293c'},
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
        primaryHover: '#51943d',
        secondary: '#ceb15c',
        secondaryHover: '#bd941a',
        error: '#c77272',
        errorHover: '#b34949'
    },
    text: {
        white: '#ffffff',
        primary: '#dddddd',
        dark: '#000000',
        secondary: '#707275',
        accents: {
            error: '#6f1f1f'
        }
    }
})

const light_theme = createMuiTheme({
    palette: {
        primary: {main:'#156ed0', dark: '#105096'},
        secondary: {main:'#ffa837'},
        background: {
            dark: '#121212',
            mediumLight: '#dee2e4',
            mediumDark: '#cfcfd0',
            main: '#f0f4f7',
            light: '#ffffff',
            tooltip: '#cbcdd0'
        }
    },
    accents: {
        primary: {main: '#77f981', hover: '#167d1e'},
        secondary: {main:'#fdbc68',  hover: '#82570a'},
        error: '#ff6f6f',
        errorHover: '#b34949'
    },
    text: {
        letterSpacing: '1px',
        white: '#ffffff',
        light: '#a9b0bd',
        primary: '#112540',
        dark: '#000000',
        secondary: '#707275',
        accents: {
            primary: {main: '#167d1e', hover: '#77f981'},
            secondary: {main: '#82570a', hover: '#fdbc68'},

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
            <ThemeProvider theme={light_theme} >
                <MainPage />
            </ThemeProvider>
        </Provider>
    )

}


ReactDOM.render(<App />,
     document.getElementById("root"))
