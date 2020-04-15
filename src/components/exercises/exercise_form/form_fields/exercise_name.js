import clsx from 'clsx'
import React, {useState} from 'react'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './form_fields.styles'
const useStyles = makeStyles(styles)


export const ExerciseName = props => {
    let classes = useStyles()

    return (
        <div className={classes.formSectionContainer}>
            <div className={clsx(classes.formSection)}>
                <div className={classes.formSectionHeader}><span>Name</span></div>
                <div className={classes.formSectionInputContainer}><input autocomplete="off" className={clsx(classes.nameInput, classes.formSectionInput)} id="name" name='name' onChange={props.onChange} value={props.value} /></div>
            </div>
        </div>
    )
}
