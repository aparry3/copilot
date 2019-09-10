import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import {Program} from './program'
import {ProgramsList} from './programs_list'


function ProgramPageView(props) {
    return (
        <div>
        {props.programs_loaded ? (
            <Switch>
                <Route path={`${props.match.path}/:program_id`} component={Program}/>
                <Route component={ProgramsList}/>
            </Switch>
        ) : <div>Loading programs...</div>}
        </div>
    )
}

export const ProgramPage = connect(state => {
    return {
        programs_loaded: state.programs.programs_loaded
    }
})(ProgramPageView)
