import { connect } from 'react-redux';
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import {history} from '../util'

import Signup from './signup'
import {Loading} from './utils';
import Home from './home'

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {styles} from './app.styles'
const useStyles = makeStyles(styles);


export const App = props => {
    let classes = useStyles()

    return (
        <div className={classes.appContainer}>
        {props.client_loaded && !!props.auth_user?
            (<Router history={history}>
                <Switch>
                    <Route path="/signup" component={Signup} />
                    <Route path='/' component={Home} />
                    <Redirect to='/'/>
                </Switch>
            </Router>) : <Loading />
        }
        </div>
    )
}
