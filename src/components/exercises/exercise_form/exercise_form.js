import clsx from 'clsx'
import React, {useEffect, useState} from 'react';
import update from 'immutability-helper';

import {normalize, titleCase} from '../../utils';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import {Categories, Description, ExerciseName, Muscles} from './form_fields'
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './exercise_form.styles'
const useStyles = makeStyles(styles)


export const ExerciseForm = props => {
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
        <>
            { !!props.open && (
            <div className={classes.exerciseFormContainer} >
                <div className={classes.closeExerciseForm} onClick={props.close}/>
                <div className={classes.exerciseFormModalContainer}>
                    <div className={classes.exerciseFormModal} >
                        <div className={classes.exerciseFormModalHeader}>
                            <div className={classes.exerciseFormModalHeaderTitle}>
                                <span>{ !!exercise.new ? 'New' : 'Edit'} Exercise</span>
                            </div>
                        </div>
                        <div className={classes.exerciseForm}>
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
                            <div className={classes.exerciseFormActions}>
                                <div onClick={handleSubmit} className={clsx(classes.exerciseFormAction, classes.saveButton)}>
                                    <CheckIcon className={classes.action} />
                                </div>
                                <div onClick={props.close} className={clsx(classes.exerciseFormAction, classes.cancelButton)}>
                                    <ClearIcon className={classes.action} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        </>

    )
}
