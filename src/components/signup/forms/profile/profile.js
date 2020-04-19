import React, {useState} from 'react'

import {Form} from '../form'
import {FormTextInput} from '../utils'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {styles} from './profile.styles'
const useStyles = makeStyles(styles);


export const Profile = props => {
    let classes = useStyles()
    console.log(props)

    function handleChangeName(e) {
        let name = {
            ...props.user.name,
            [e.target.name]: e.target.value
        }

        props.onChange('name', name)
    }

    function handleChange(e) {
        props.onChange('email', e.target.value)
    }

    function validate() {
        return !!props.user.name.first && !!props.user.name.last && !!props.user.email
    }

    return (
        <Form
            back={props.back}
            confirm={props.confirm}
            condition={validate()}
            subtitle='Please enter some basic information:'>
            <div className={classes.nameContainer}>
                <div className={classes.name}>
                    <FormTextInput onChange={handleChangeName} label='First Name' name='first' value={props.user.name.first} />
                </div>
                <div className={classes.initial}>
                    <FormTextInput onChange={handleChangeName} label='MI' name='middle' value={props.user.name.middle} />
                </div>
                <div className={classes.name}>
                    <FormTextInput onChange={handleChangeName} label='Last Name' name='last' value={props.user.name.last} />
                </div>
            </div>
            <div className={classes.email}>
                <FormTextInput onChange={handleChange} label='Email' name='email' value={props.user.email} />
            </div>
        </Form>
    )
}
