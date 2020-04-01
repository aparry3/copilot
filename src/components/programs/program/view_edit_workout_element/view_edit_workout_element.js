import React from 'react'

import ClearIcon from '@material-ui/icons/Clear'
import {Details, ExerciseName, Notes} from './form_fields'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './view_edit_workout_element.styles'
const useStyles = makeStyles(styles)




export const ViewEditWorkoutElement = props => {
    let classes = useStyles()
    return (
        <div className={classes.viewEditWorkoutElement}>
            <div className={classes.viewEditWorkoutElementHeader}>
                <div className={classes.viewEditWorkoutElementTitle}>
                    <span>Edit Exercise</span>
                </div>
                <div onClick={props.closeEdit} className={classes.viewEditWorkoutElementClose}>
                    <ClearIcon />
                </div>
            </div>
            <div className={classes.workoutElementForm}>
                <ExerciseName />
                <Notes />
                <Details />
            </div>
        </div>
    )
}
