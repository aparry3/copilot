import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import {Program} from './program'
import {ProgramsList} from './programs_list'


export function ProgramPage(props) {
    return (
        <Switch>
            <Route path={`${props.match.path}/:program_id`} component={Program}/>
            <Route path component={ProgramsList}/>
        </Switch>
    )
}
