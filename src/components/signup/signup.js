import React, {useState} from 'react'
import update from 'immutability-helper'
import UserType from './user_type'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {styles} from './signup.styles'
const useStyles = makeStyles(styles);

const pages = {
    TYPE: 'TYPE',
    PROFILE: 'PROFILE'
}

export const Signup = props => {
    let classes = useStyles()
    let [page, setPage] = useState(pages.TYPE)
    let [new_user, setNewUser] = useState({})

    function updateUser(property, value) {
        setNewUser(update(new_user, {
            [property]: {$set: value}
        }))
    }

    function renderPage() {
        switch (page) {
            case page.TYPE:
                return <UserType user={new_user} onChange={updateUser} next={() => setPage(pages.PROFILE)}/>
            default:
                return <UserType user={new_user} onChange={updateUser} next={() => setPage(pages.PROFILE)} />
        }
    }

    return (
        <div className={classes.signupContainer}>
            <div className={classes.signup}>
                {renderPage()}
            </div>
        </div>
    )
}
// <Profile user={new_user} onChange={updateUser} />
