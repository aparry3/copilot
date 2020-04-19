import clsx from 'clsx'
import React, {useState} from 'react'

import AssignmentIcon from '@material-ui/icons/Assignment';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import {Form} from '../form'
import {Wordmark} from '../../../utils'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {styles} from './user_role.styles'
const useStyles = makeStyles(styles);


const roles = {
    TRAINER: 'TRAINER',
    CLIENT: 'CLIENT'
}

const Role = props => {
    let classes = useStyles()

    let css_classes = props.selected ? clsx(classes.userRole, classes.selected) : clsx(classes.userRole)
    return (
        <div className={classes.userRoleContainer}>
            <div onClick={props.onClick} className={css_classes}>
                {props.children}
            </div>
        </div>

    )
}

export const UserRole = props => {
    let classes = useStyles()

    function toggleRole(role) {
        if (props.user.role == role) {
            role = null
        }
        props.onChange('role', role)
    }


    return (
        <Form
            next={props.next}
            condition={!!props.user.role}
            title={`Welcome, ${props.auth_user.name || props.auth_user.email}!`}
            subtitle='Please select role(s):'
            >
            <div className={classes.userRoles}>
                <Role onClick={() => toggleRole(roles.TRAINER)} selected={props.user.role == roles.TRAINER}>
                    <div className={classes.roleIcon}>
                        <AssignmentIcon className={classes.icon}/>
                    </div>
                    <div className={classes.roleTitle}>
                        <span>Trainer</span>
                    </div>
                </Role>
                <div>
                </div>
                <Role onClick={() => toggleRole(roles.CLIENT)} selected={props.user.role == roles.CLIENT}>
                    <div className={classes.roleIcon}>
                        <FitnessCenterIcon className={classes.icon}/>
                    </div>
                    <div className={classes.roleTitle}>
                        <span>Client</span>
                    </div>
                </Role>
            </div>
        </Form>
    )
}
