import clsx from 'clsx'
import React, {useEffect, useState} from 'react';
import update from 'immutability-helper';

import {normalize, titleCase} from '../../utils';
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

    function handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        setExercise(update(exercise, {
            [name]: {$set: value}
        }))
    }
    async function handleSubmit(e) {
        e.preventDefault();
        let res = await props.save(exercise)
        if (props.callback) {
            props.callback(res.exercise)
        }

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
                <div className={classes.exerciseFormPopupContainer}>
                    <div className={classes.exerciseFormPopup} >
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <div className={classes.exerciseForm}>
                                <ExerciseName value={exercise.name} onChange={handleChange}/>
                                <Description value={exercise.description} onChange={handleChange}/>
                                <Categories value={exercise.categories} onChange={handleChange}/>
                                <Muscles title='primary' name='primary_muscles' value={exercise.primary_muscles} onChange={handleChange}/>
                                <Muscles title='secondary' name='secondary_muscels' value={exercise.secondary_muscles} onChange={handleChange}/>
                                <div>
                                    <input className="btn btn-primary" type="submit" value="submit" />
                                </div>
                                <div>
                                    <button className="btn btn-light" onClick={handleCancel}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>)}
        </>

    )
}
