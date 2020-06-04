import clsx from 'clsx'
import {copyState} from '../../../../reducers/utils'
import React, {useEffect, useState} from 'react'
import update from 'immutability-helper'
import {titleCase} from '../../../utils'

import {types as workout_element_types} from '../../../../constants/workout_elements'

import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear';
import {Details, ExerciseName, Notes, Scheme, SchemeSelect} from './form_fields'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {FormField, InputTitle, Modal} from '../../../utils'

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

    function updateWorkoutElement(property, value, key = null, index = null) {
        let update_query = {[property]: {$set: value}}
        if (key != null) {
            update_query = {[key]: index != null ? {[index]: update_query} : update_query}
        }
        let new_workout_element = update(workout_element, update_query)
        setWorkoutElement(new_workout_element)
    }

    function addExercise() {
        let new_exercise = {exercise: {name: null, id: null}, notes: null, details: {}, collapsed: false}
        let new_workout_element
        if (workout_element.type == workout_element_types.EXERCISE) {
            let exercises = [{
                exercise: workout_element.exercise,
                notes: null,
                details: {},
                collapsed: false
            }, new_exercise]

            new_workout_element = {
                type: workout_element_types.SUPERSET,
                notes: workout_element.notes,
                details: workout_element.details,
                scheme: workout_element.scheme,
                exercises: exercises
            }
        } else {
            let _exercises = copyState(workout_element.exercises)
            _exercises.push(new_exercise)
            if (!!workout_element.alternate) {
                _exercises.map((e, i) => {
                    e.alternate_detail = getAlternateDetail(i, length)
                    return e
                })
            }
            new_workout_element = update(workout_element, {
                exercises: {$set: _exercises}
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
                exercise: {...new_workout_element.exercises.pop().exercise},
                notes: new_workout_element.notes,
                details: new_workout_element.details,
                scheme: new_workout_element.scheme,
                type: workout_element_types.EXERCISE
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

    function title() {
        return (
            !!workout_element.scheme && !!workout_element.scheme.length ?
            titleCase(workout_element.scheme.join(', ')) :
            titleCase(workout_element.type)
        )
    }

    function getAlternateDetail(index, length) {
        if (length == 2) {
            return index == 0 ? 'Evens' : 'Odds'
        }
        return `${index + 1}s`
    }

    function toggleAlternate() {
        let _exercises = workout_element.exercises
        let length = workout_element.exercises.length
        if (!workout_element.alternate) {
            _exercises = workout_element.exercises.map((e, i) => {
                e.alternate_detail = getAlternateDetail(i, length)
                return e
            })
        }
        setWorkoutElement(update(workout_element, {
            alternate: {$set: !workout_element.alternate},
            exercises: {$set: _exercises}
        }))
    }

    return (
        <Modal
            close={props.closeEdit}
            open={props.open}
            save={() => props.saveWorkoutElement(props.location, workout_element)}
            title={`Edit  ${title()}`}
            options={(
                <SchemeSelect value={workout_element.scheme} onChange={(value) => updateWorkoutElement('scheme', value)}/>
            )}
            >
            <div className={classes.viewEditWorkoutElementContent}  onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <Scheme scheme={workout_element.scheme} details={workout_element.details} onChange={(value) => updateWorkoutElement('details', value)}/>
            { workout_element.type == workout_element_types.EXERCISE ? (
                <>
                <div className={classes.exerciseFormContainer}>
                    <div className={clsx(classes.exerciseForm)}>
                            <ExerciseName onAddExercise={(name) => props.addExercise(name, workout_element)} value={workout_element.exercise} onChange={(value) => updateWorkoutElement('exercise', value)}/>
                            <Notes value={workout_element.notes} onChange={(value) => updateWorkoutElement('notes', value)}/>
                            <Details value={workout_element.details} onChange={(value) => updateWorkoutElement('details', value)}/>
                    </div>
                </div>
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
                </>
            ) : (
                <FormField
                title='exercises'
                action={(
                    <div className={clsx(classes.formAction, !!workout_element.alternate ? classes.alternateSelected : classes.alternateUnselected)} onClick={toggleAlternate}>
                        <span>Alternate</span>
                    </div>
                )}
                >
                <>
                {workout_element.exercises.map((e, i) => (
                    <div className={classes.exerciseFormContainer}>
                        <div className={clsx(classes.exerciseForm, classes.supersetExercise)}>
                            <div className={classes.exerciseFormHeader}>
                                <div className={classes.titleContainer}>
                                    <div onClick={() => toggleCollapse(i)} className={classes.actionContainer}>{ !e.collapsed ? (<ExpandLessIcon className={classes.action}/>) : (<ExpandMoreIcon className={classes.action} />)}</div>
                                    { !!workout_element.alternate && (<InputTitle value={e.alternate_detail} autocomplete="off" onSave={(value) => updateWorkoutElement('alternate_detail', value, 'exercises', i)} />)}
                                </div>
                                <div className={classes.actionContainer}>
                                    <ClearIcon onClick={() => removeExercise(i)} className={classes.action}/>
                                </div>
                            </div>
                            <div className={classes.exerciseFormContent}>
                                <ExerciseName onAddExercise={(name) => props.addExercise(name,{...workout_element, index:i})} value={e.exercise} onChange={(value) => updateWorkoutElement('exercise', value, 'exercises', i)}/>
                                { !e.collapsed && (
                                <>
                                    <Notes value={e.notes} onChange={(value) => updateWorkoutElement('notes', value, 'exercises', i)}/>
                                    <Details value={e.details} onChange={(value) => updateWorkoutElement('details', value, 'exercises', i)}/>
                                </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
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

                </>
                </FormField>
            )}

            { workout_element.type == workout_element_types.SUPERSET && (
                <>
                <Notes value={workout_element.notes} onChange={(value) => updateWorkoutElement('notes', value)}/>
                <Details value={workout_element.details} onChange={(value) => updateWorkoutElement('details', value)}/>
                </>
            )}
            </div>
        </Modal>
    )
}
