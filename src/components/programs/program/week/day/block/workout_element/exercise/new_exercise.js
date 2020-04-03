import React from 'react'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './new_exercise.styles'
const useStyles = makeStyles(styles)


export const NewExercise = props => {
    let classes = useStyles()
    return (
        <div className={classes.exerciseContainer}>
            <div className={classes.exerciseHeader}><div className={classes.placholderHeader}/></div>
            <div className={classes.exerciseContent}>
                <div className={classes.exerciseNotes} />
                <div className={classes.exerciseDetails}>
                    <div className={classes.placeholderDetails} />
                </div>
            </div>
        </div>
    )
}
