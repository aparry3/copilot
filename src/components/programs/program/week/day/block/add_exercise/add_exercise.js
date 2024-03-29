import clsx from 'clsx'
import React, {useState} from 'react'

import {types as workout_element_types} from '../../../../../../../constants/workout_elements'

import AddIcon from '@material-ui/icons/Add';

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './add_exercise.styles'
const useStyles = makeStyles(styles)


export const AddExercise = props => {
    let classes = useStyles()
    let [active, setActive] = useState(false)

    return (
        <div onClick={() => setActive(!active)} className={classes.addExercise}>
            <div className={classes.addExerciseButton}>
                <AddIcon />
            </div>
            { active && (
                <div className={classes.addExercisePopup}>
                    <div className={classes.addExerciseTypeContainer}>
                        <div className={clsx(classes.addExerciseType, classes.exercise)}
                            onClick={() => props.addWorkoutElement(workout_element_types.EXERCISE)}>
                            <span>Exercise</span>
                        </div>
                    </div>
                    <div className={classes.addExerciseTypeContainer}>
                        <div className={clsx(classes.addExerciseType, classes.superset)}
                            onClick={() => props.addWorkoutElement(workout_element_types.SUPERSET)}>
                            <span>Superset</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
