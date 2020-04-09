import React from 'react'

import {details} from '../../../../../../../utils'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './exercise.styles'
const useStyles = makeStyles(styles)

export const Exercise = props => {
    let classes = useStyles()
    console.log(props.exercise)
    return (
        <div className={classes.exerciseContainer}>
            <div className={classes.exerciseHeader}>
                <span>{props.exercise.exercise.name}</span>
            </div>
            <div className={classes.exerciseContent}>
                { !!props.exercise.notes && (
                    <div className={classes.exerciseNotes}>
                        {props.exercise.notes}
                    </div>
                )}
                { Object.keys(props.exercise.details).length > 0 && (
                    <div className={classes.exerciseDetails}>
                        {Object.keys(props.exercise.details).map(k => details[k].value(props.exercise.details[k]))}
                    </div>
                )}
            </div>
        </div>
    )
}
