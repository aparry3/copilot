import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import {ConfirmMessage, Loading, Logo} from '../utils';
import {Dashboard} from '../dashboard'
import {ExerciseDetails} from '../exercises/exercise_details'
import {ProgramPage} from '../programs';
import Sidebar from './sidebar';
import ViewEditWorkoutElement from '../programs/program/view_edit_workout_element'
import {ViewExercises} from '../exercises';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {styles} from './home.styles'
const useStyles = makeStyles(styles)


export const Home = (props) => {
    let {match} = props;
    let classes = useStyles()
    return(
        <div className={classes.home}>
            {props.loading ? ( <Loading />) : (
            <>
            {!!props.user ? (
                <div className={classes.app}>
                    <Sidebar path={match.path}/>
                    <main className={classes.content}>
                        <ConfirmMessage />
                        <ViewEditWorkoutElement />
                        { !!props.form_open && <ExerciseDetails /> }
                        <Switch>
                            <Route path={`/exercises`} component={ViewExercises} />
                            <Route path={`/programs`} component={ProgramPage} />
                            <Route path={`/dashboard`} component={Dashboard} />
                            <Redirect to={`/programs`}/>
                        </Switch>
                    </main>
                </div>
            ) : (
                <Redirect to={{
                  pathname: "/signup",
                  state: { targetUrl: props.location }
              }}/>
          )}
          </>)}
        </div>

    )
}
