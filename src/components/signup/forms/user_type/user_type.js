import clsx from 'clsx'
import React, {useState} from 'react'

import AssignmentIcon from '@material-ui/icons/Assignment';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import {Form} from '../form'
import {Wordmark} from '../../../utils'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {styles} from './user_type.styles'
const useStyles = makeStyles(styles);


const roles = {
    TRAINER: 'TRAINER',
    CLIENT: 'CLIENT'
}

const Type = props => {
    let classes = useStyles()

    let css_classes = props.selected ? clsx(classes.userType, classes.selected) : clsx(classes.userType)
    return (
        <div className={classes.userTypeContainer}>
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


    return (
        <Form
            next={props.next}
            condition={!!props.user.type}
            title={`Welcome, ${props.auth_user.name || props.auth_user.email}!`}
            subtitle='Please select role(s):'
            >
            <div className={classes.userTypes}>
                <Type onClick={() => toggleType(roles.TRAINER)} selected={props.user.type == roles.TRAINER}>
                    <div className={classes.typeIcon}>
                        <AssignmentIcon className={classes.icon}/>
                    </div>
                    <div className={classes.typeTitle}>
                        <span>Trainer</span>
                    </div>
                </Type>
                <div>
                </div>
                <Type onClick={() => toggleType(roles.CLIENT)} selected={props.user.type == roles.CLIENT}>
                    <div className={classes.typeIcon}>
                        <FitnessCenterIcon className={classes.icon}/>
                    </div>
                    <div className={classes.typeTitle}>
                        <span>Client</span>
                    </div>
                </Type>
            </div>
        </Form>
    )
}
