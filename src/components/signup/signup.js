import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import React, {useState} from 'react'
import update from 'immutability-helper'

import {UserRole, Profile} from './forms'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {styles} from './signup.styles'
const useStyles = makeStyles(styles);

const pages = {
    ROLE: 'ROLE',
    PROFILE: 'PROFILE',
    CONFIRM: 'CONFIRM'
}

function parseName(user) {
    return {
        first: !!user.given_name ? user.given_name : null,
        middle: null,
        last: !!user.family_name ? user.family_name : null
    }
}

export const Signup = props => {
    let classes = useStyles()
    let [loading, setLoading] = useState(false)
    let [page, setPage] = useState(pages.ROLE)

    let [new_user, setNewUser] = useState({
        role: null,
        name: parseName(props.auth_user),
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

    function renderPage() {
        switch (page) {
            case pages.TYPE:
                return <UserRole user={new_user} onChange={updateUser} next={() => setPage(pages.PROFILE)}/>
            case pages.PROFILE:
                return <Profile user={new_user} onChange={updateUser} back={() => setPage(pages.TYPE)} confirm={addUser} />
            default:
                return <UserRole user={new_user} onChange={updateUser} next={() => setPage(pages.PROFILE)} />
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
