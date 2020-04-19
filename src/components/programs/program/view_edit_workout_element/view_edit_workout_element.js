import clsx from 'clsx'
import React, {useEffect, useState} from 'react'
import update from 'immutability-helper'
import {titleCase} from '../../../utils'

import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear';
import {Details, ExerciseName, Notes} from './form_fields'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {Modal} from '../../../utils'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './view_edit_workout_element.styles'
const useStyles = makeStyles(styles)




export const ViewEditWorkoutElement = props => {
    let classes = useStyles()
    let [workout_element, setWorkoutElement] = useState(props.workout_element)
    let [hover, setHover] = useState(false)

    useEffect(() => {
        setWorkoutElement(props.workout_element)
    }, [props.workout_element])

    function updateWorkoutElement(property, value, index = null) {
        let update_query = {[property]: {$set: value}}
        if (index != null) {
            update_query = {exercises: {[index]: update_query}}
        }
        let new_workout_element = update(workout_element, update_query)
        setWorkoutElement(new_workout_element)
    }

    function addExercise() {
        let new_exercise = {exercise: {name: null, id: null}, notes: null, details: {}, collapsed: false}
        let new_workout_element
        if (workout_element.type == 'exercise') {
            let exercises = [{
                exercise: workout_element.exercise,
                notes: workout_element.notes,
                details: workout_element.details,
                collapsed: false
            }, new_exercise]

            new_workout_element = {
                type: 'superset',
                notes: null,
                details: {},
                exercises: exercises
            }
        } else {
            new_workout_element = update(workout_element, {
                exercises: {$push: [new_exercise]}
            })
        }
        setWorkoutElement(new_workout_element)
    }

    function removeExercise(index) {
        let new_workout_element = update(workout_element, {
            exercises: {$splice: [[index, 1]]}
        })
        if (new_workout_element.exercises.length == 1) {
            new_workout_element = {
                ...new_workout_element.exercises.pop(),
                type: 'exercise'
            }
        }
        setWorkoutElement(new_workout_element)
    }

    function toggleCollapse(index) {
        let new_workout_element = update(workout_element, {
            exercises: {[index]: {collapsed: {$set: !workout_element.exercises[index].collapsed}}}
        })
        setWorkoutElement(new_workout_element)
    }

    return (
        <Modal
            close={props.closeEdit}
            open={props.open}
            save={() => props.saveWorkoutElement(props.location, workout_element)}
            title={`Edit  ${!!workout_element && titleCase(workout_element.type)}`}
            >
            { !!workout_element && (
                <div className={classes.viewEditWorkoutElementContent}  onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                { workout_element.type == 'exercise' ? (
                    <div className={classes.exerciseFormContainer}>
                        <div className={clsx(classes.exerciseForm)}>
                                <ExerciseName onAddExercise={(name) => props.addExercise(name, workout_element)} value={workout_element.exercise} onChange={(value) => updateWorkoutElement('exercise', value)}/>
                                <Notes value={workout_element.notes} onChange={(value) => updateWorkoutElement('notes', value)}/>
                                <Details value={workout_element.details} onChange={(value) => updateWorkoutElement('details', value)}/>
                        </div>
                    </div>
                ) : workout_element.exercises.map((e, i) => (
                    <div className={classes.exerciseFormContainer}>
                        <div className={clsx(classes.exerciseForm, classes.supersetExercise)}>
                            <div className={classes.exerciseFormHeader}>
                                <div onClick={() => toggleCollapse(i)} className={classes.actionContainer}>
                                    { !e.collapsed ? (<ExpandLessIcon className={classes.action}/>) : (<ExpandMoreIcon className={classes.action} />)}
                                </div>
                                <div className={classes.actionContainer}>
                                    <ClearIcon onClick={() => removeExercise(i)} className={classes.action}/>
                                </div>
                            </div>
                            <div className={classes.exerciseFormContent}>
                                <ExerciseName onAddExercise={(name) => props.addExercise(name, workout_element)} value={e.exercise} onChange={(value) => updateWorkoutElement('exercise', value, i)}/>
                                { !e.collapsed && (
                                <>
                                    <Notes value={e.notes} onChange={(value) => updateWorkoutElement('notes', value, i)}/>
                                    <Details value={e.details} onChange={(value) => updateWorkoutElement('details', value, i)}/>
                                </>
                                )}
                            </div>
                        </div>
                    </div>
                ))
                }
                {
                    hover && (
                    <div className={classes.exerciseFormContainer}>
                        <div onClick={addExercise} className={classes.exerciseForm}>
                            <div className={classes.addExercise}>
                                <span><AddIcon /> Add Exercise...</span>
                            </div>
                        </div>
                    </div>
                )}
                { workout_element.type == 'superset' && (
                    <>
                    <Notes value={workout_element.notes} onChange={(value) => updateWorkoutElement('notes', value)}/>
                    <Details value={workout_element.details} onChange={(value) => updateWorkoutElement('details', value)}/>
                    </>
                )}
                </div>
            )}
        </Modal>
    )
}
