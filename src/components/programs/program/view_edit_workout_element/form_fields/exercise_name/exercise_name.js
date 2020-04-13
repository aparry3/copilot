import clsx from 'clsx'
import React, {useState} from 'react'

import {CustomSelect} from '../../../../../utils'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './exercise_name.styles'
const useStyles = makeStyles(styles)

export const ExerciseName = props => {
    let classes = useStyles()

    // let [exercise, setExercise] = useState(props.value)
    let [name_header, setNameHeader] = useState(!!props.superset ? 'exercises' : 'exercise')

    function select(e) {
        console.log(e)
        let selected_exercise = props.exercises.find(ex => ex.name == e.target.value)
        let new_exercise = {
            name: e.target.value,
            id: !!selected_exercise ? selected_exercise._id : null
        }
        props.onChange(new_exercise)
    }

    return (
        <div className={clsx(classes.formFieldContainer, classes.exerciseNameContainer)}>
            <div className={classes.formFieldHeader}>
                <span>{name_header.toUpperCase()}</span>
            </div>
            <div className={classes.formFieldContent}>
                <div className={classes.exerciseNameText}>
                    <CustomSelect
                        value={props.value.name}
                        name='name'
                        onChange={select}
                        elements={props.exercises.map(e => e.name)}
                        placeholder={`Exercise name...`}/>
                </div>
            </div>
        </div>
    )
}
