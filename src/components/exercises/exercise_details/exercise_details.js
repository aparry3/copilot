import clsx from 'clsx'
import React, {useEffect, useState} from 'react';
import update from 'immutability-helper';

import {normalize, titleCase} from '../../utils';

import {Categories, Description, ExerciseName, Muscles} from './form_fields'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {Modal} from '../../utils';
import Select from '@material-ui/core/Select';

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './exercise_details.styles'
const useStyles = makeStyles(styles)


export const ExerciseDetails = props => {
    let [exercise, setExercise] = useState(props.exercise)
    let classes = useStyles()
    useEffect(() => {
        setExercise(props.exercise)
    }, [props.exercise])

    function handleChange(property, value) {
        setExercise(update(exercise, {
            [property]: {$set: value}
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await props.save(exercise)
        props.close()
    }

    function handleCancel(e) {
        e.preventDefault()
        props.close()
    }

    return (
        <Modal
            close={props.close}
            save={async () => props.save(exercise)}
            open={props.open}
            title={`${!!exercise.new ? 'New' : 'Edit'} Exercise`}>
                <ExerciseName value={exercise.name} onChange={(value) => handleChange('name', value)}/>
                <Description value={exercise.description} onChange={(value) => handleChange('description', value)}/>
                <Categories value={exercise.categories} onChange={(value) => handleChange('categories', value)}/>
                <Muscles
                    title='primary muscles'
                    name='primary_muscles'
                    value={exercise.primary_muscles}
                    onChange={(value) => handleChange('primary_muscles', value)}/>
                <Muscles
                    title='secondary muscles'
                    name='secondary_muscles'
                    value={exercise.secondary_muscles}
                    onChange={(value) => handleChange('secondary_muscles', value)}/>
        </Modal>
    )
}
