import React from 'react'

import Exercise, {NewExercise} from './exercise'
import Superset, {NewSuperset} from './superset'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './workout_element.styles'
const useStyles = makeStyles(styles)


export const WorkoutElement = props => {
    let classes = useStyles()

    function renderWorkoutElement(workout_element) {
        switch (workout_element.type) {
            case 'superset':
                return !!workout_element.placeholder ? <NewSuperset superset={workout_element} /> : <Superset superset={workout_element} />
            case 'exercise':
                return !!workout_element.placeholder ? <NewExercise exercise={workout_element} /> : <Exercise exercise={workout_element} />
            default:
                return <Exercise exercise={workout_element} />
        }
    }

    return (
        <div onClick={() => props.editWorkoutElement()} className={classes.workoutElementContainer}>
            <div className={classes.workoutElement} >
                {renderWorkoutElement(props.workout_element)}
            </div>
        </div>
    )
}
