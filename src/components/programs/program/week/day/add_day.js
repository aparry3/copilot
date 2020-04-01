import clsx from 'clsx'
import React from 'react'

import AddIcon from '@material-ui/icons/Add'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './day.styles'
const useStyles = makeStyles(styles)

export const AddDay = props => {
    let classes = useStyles()
    return (
        <div className={classes.day}>
            <div className={classes.dayContent}>
                <div className={classes.dayHeader}>
                    <span onClick={props.handleClick} className={classes.addDayText}><AddIcon /> New day</span>
                </div>
            </div>
        </div>
    )
}
