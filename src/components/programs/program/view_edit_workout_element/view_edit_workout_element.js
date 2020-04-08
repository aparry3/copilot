import React, {useEffect, useState} from 'react'
import update from 'immutability-helper'

import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import {Details, ExerciseName, Notes} from './form_fields'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './view_edit_workout_element.styles'
const useStyles = makeStyles(styles)




export const ViewEditWorkoutElement = props => {
    let classes = useStyles()
    let [workout_element, setWorkoutElement] = useState(props.workout_element)

    useEffect(() => {
        setWorkoutElement(props.workout_element)
    }, [props.workout_element])

    function updateWorkoutElement(property, value) {
        let new_workout_element = update(workout_element, {
            [property]: {$set: value}
        })
        setWorkoutElement(new_workout_element)
    }
    console.log(props.workout_element)
    return (
        <div className={classes.viewEditWorkoutElementContainer}>
            <div className={classes.viewEditWorkoutElement}>
                <div className={classes.viewEditWorkoutElementHeader}>
                    <div className={classes.viewEditWorkoutElementTitle}>
                        <span>Edit Exercise</span>
                    </div>
                    <div onClick={() => props.closeEdit()} className={classes.viewEditWorkoutElementClose}>
                        <ClearIcon />
                    </div>
                </div>
                <div className={classes.workoutElementForm}>
                    <ExerciseName value={workout_element.exercise} onChange={(value) => updateWorkoutElement('exercise', value)}/>
                    <Notes value={workout_element.notes} onChange={(value) => updateWorkoutElement('notes', value)}/>
                    <Details value={workout_element.details} onChange={(value) => updateWorkoutElement('details', value)}/>
                </div>
            </div>
            <div className={classes.viewEditWorkoutElementFooter}>
                <div className={classes.viewEditWorkoutElementActionContainer}>
                    <div className={classes.viewEditWorkoutElementAction} onClick={() => props.saveWorkoutElement(props.location, workout_element)}>
                        <span><CheckIcon /></span>
                    </div>
                </div>
                <div className={classes.viewEditWorkoutElementActionContainer}>
                    <div className={classes.viewEditWorkoutElementAction} onClick={() => props.closeEdit()}>
                        <span><ClearIcon /></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
