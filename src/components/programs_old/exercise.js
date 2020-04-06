import React, {useState, useEffect} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {styles} from './exercise.styles'

let useStyles = makeStyles(styles)

export const Exercise = props => {

    let classes = useStyles()
    return (
        <div className={classes.exercise}>
            <span>{props.exercise._id}</span>
        </div>
    )
}
