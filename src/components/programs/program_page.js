import React from "react";

import {Loading} from '../utils'

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import Program from './program'
import ProgramsList from './programs_list'


function ProgramPageView(props) {
    return (
        <>
        {props.programs_loaded ? (
            <Switch>
                <Route path={`${props.match.path}/:program_id`} component={Program}/>
                <Route component={ProgramsList}/>
            </Switch>
        ) : <Loading />}
        </>
    )
}

export const ProgramPage = connect(state => ({
        programs_loaded: state.programs.programs_loaded
    })
)(ProgramPageView)
