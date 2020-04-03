import React, {useState} from 'react'
import update from 'immutability-helper'

import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import {Details, ExerciseName, Notes} from './form_fields'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './view_edit_workout_element.styles'
const useStyles = makeStyles(styles)




export const ViewEditWorkoutElement = props => {
    let classes = useStyles()
    let [workout_element, setWorkoutElement] = useState(props.workout_element)
    console.log(workout_element)

    function updateWorkoutElement(property, value) {
        let new_workout_element = update(workout_element, {
            [property]: {$set: value}
        })
        setWorkoutElement(new_workout_element)
    }

    return (
        <div className={classes.viewEditWorkoutElement}>
            <div className={classes.viewEditWorkoutElementHeader}>
                <div className={classes.viewEditWorkoutElementTitle}>
                    <span>Edit Exercise</span>
                </div>
                <div onClick={() => props.closeEdit(props.location)} className={classes.viewEditWorkoutElementClose}>
                    <ClearIcon />
                </div>
            </div>
            <div className={classes.workoutElementForm}>
                <ExerciseName value={workout_element.exercise} onChange={(value) => updateWorkoutElement('exercise', value)}/>
                <Notes value={workout_element.notes} onChange={(value) => updateWorkoutElement('notes', value)}/>
                <Details value={workout_element.details} onChange={(value) => updateWorkoutElement('details', value)}/>
            </div>
            <div className={classes.viewEditWorkoutElementActionContainer}>
                <div className={classes.viewEditWorkoutElementAction} onClick={() => props.saveWorkoutElement(workout_element)}>
                    <span><AddIcon /></span>
                </div>
                <div className={classes.viewEditWorkoutElementAction} onClick={() => props.closeEdit(props.location)}>
                    <span><ClearIcon /></span>
                </div>
            </div>
        </div>
    )
}
