import clsx from 'clsx'
import React, {useState} from 'react'

import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import AssignmentIcon from '@material-ui/icons/Assignment';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import {Wordmark} from '../../utils'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {styles} from './user_type.styles'
const useStyles = makeStyles(styles);


const roles = {
    TRAINER: 'TRAINER',
    CLIENT: 'CLIENT'
}

const Type = props => {
    let classes = useStyles()

    let css_classes = props.selected ? clsx(classes.signupUserType, classes.selected) : clsx(classes.signupUserType)
    return (
        <div className={classes.signupUserTypeContainer}>
            <div onClick={props.onClick} className={css_classes}>
                {props.children}
            </div>
        </div>

    )
}

export const UserType = props => {
    let classes = useStyles()

    function toggleType(role) {
        if (props.user.type == role) {
            role = null
        }
        props.onChange('type', role)
    }

    function next() {
        if (!!props.user.type) {
            props.next()
        }
    }


    return (
        <div className={classes.signupForm}>
            <div className={classes.signupFormContent}>
                <div className={classes.userTypeHeader}>
                    <div className={classes.wordmark}>
                        <Wordmark height={75}/>
                    </div>
                    <div className={classes.userTypeTitle}>
                        <span >Welcome, {props.auth_user.name || props.auth_user.email}!</span>
                    </div>
                </div>
                <div className={classes.signupUserTypesTitle}>
                    <span>Are you a</span>
                </div>
                <div className={classes.signupUserTypes}>
                    <Type onClick={() => toggleType(roles.TRAINER)} selected={props.user.type == roles.TRAINER}>
                        <div className={classes.signupUserTypeIcon}>
                            <AssignmentIcon className={classes.icon}/>
                        </div>
                        <div className={classes.signupUserTypeTitle}>
                            <span>Trainer</span>
                        </div>
                    </Type>
                    <div>
                    </div>
                    <Type onClick={() => toggleType(roles.CLIENT)} selected={props.user.type == roles.CLIENT}>
                        <div className={classes.signupUserTypeIcon}>
                            <FitnessCenterIcon className={classes.icon}/>
                        </div>
                        <div className={classes.signupUserTypeTitle}>
                            <span>Client</span>
                        </div>
                    </Type>
                </div>
            </div>
            <div onClick={next} className={classes.signupFormFooter}>
                <span className={!!props.user.type ? classes.nextActive : classes.nextInactive}>Next <ArrowForwardIcon /></span>
            </div>
        </div>
    )
}
