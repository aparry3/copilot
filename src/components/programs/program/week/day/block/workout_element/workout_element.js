import React from 'react'

import {types as workout_element_types} from '../../../../../../../constants/workout_elements'

import Exercise, {NewExercise} from './exercise'
import Superset, {NewSuperset} from './superset'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './workout_element.styles'
const useStyles = makeStyles(styles)


export const WorkoutElement = props => {
    let classes = useStyles()

    function renderWorkoutElement(workout_element) {
        switch (workout_element.type) {
            case workout_element_types.SUPERSET:
                return !!workout_element.placeholder ? <NewSuperset superset={workout_element} /> : <Superset delete={() => props.deleteWorkoutElement('superset')} superset={workout_element} />
            case workout_element_types.EXERCISE:
                return !!workout_element.placeholder ? <NewExercise exercise={workout_element} /> : <Exercise deletable delete={() => props.deleteWorkoutElement('exercise')} exercise={workout_element} />
            default:
                return <Exercise exercise={workout_element} />
        }
    }

    return (
        <div ref={props.forwardRef} onClick={() => props.editWorkoutElement()} className={classes.workoutElementContainer}>
            <div className={classes.workoutElement} >
                {renderWorkoutElement(props.workout_element)}
            </div>
        </div>
    )
}
