import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import React, {useState} from 'react'
import update from 'immutability-helper'

import {UserType, Profile} from './forms'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {styles} from './signup.styles'
const useStyles = makeStyles(styles);

const pages = {
    TYPE: 'TYPE',
    PROFILE: 'PROFILE',
    CONFIRM: 'CONFIRM'
}

export const Signup = props => {
    let classes = useStyles()
    let [loading, setLoading] = useState(false)
    let [page, setPage] = useState(pages.TYPE)

    let [new_user, setNewUser] = useState({
        type: null,
        name: {
            first: null,
            middle: null,
            last: null
        },
        email: props.auth_user.email
    })

    function updateUser(property, value) {
        setNewUser(update(new_user, {
            [property]: {$set: value}
        }))
    }

    function addUser() {
        props.addUser(new_user)
        setLoading(true)
    }
    console.log(new_user)
    function renderPage() {
        switch (page) {
            case pages.TYPE:
                return <UserType user={new_user} onChange={updateUser} next={() => setPage(pages.PROFILE)}/>
            case pages.PROFILE:
                return <Profile user={new_user} onChange={updateUser} back={() => setPage(pages.TYPE)} confirm={addUser} />
            default:
                return <UserType user={new_user} onChange={updateUser} next={() => setPage(pages.PROFILE)} />
        }
    }

    return (
        <div className={classes.signupContainer}>
            <div className={classes.signup}>
            { !props.user ? renderPage() : (
                <Redirect to={`/`}/>
            )}
            </div>
        </div>
    )
}
// <Profile user={new_user} onChange={updateUser} />
