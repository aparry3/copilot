import React, {useState} from 'react'

import {CustomSelect} from '../../../../../utils'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './exercise_name.styles'
const useStyles = makeStyles(styles)

export const ExerciseName = props => {
    let classes = useStyles()

    let [name, setName] = useState(props.value)
    let [name_header, setNameHeader] = useState(!!props.superset ? 'exercises' : 'exercise')

    function select(e) {
        setName(e.target.value)
    }

    return (
        <div className={classes.formFieldContainer}>
            <div className={classes.formFieldHeader}>
                <span>{name_header.toUpperCase()}</span>
            </div>
            <div className={classes.formFieldContent}>
                <div className={classes.exerciseNameText}>
                    <CustomSelect
                        value={name}
                        name='name'
                        onChange={select}
                        elements={props.exercises.map(e => e.name)}
                        placeholder={`Exercise name...`}/>
                </div>
            </div>
        </div>
    )
}
