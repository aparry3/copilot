import clsx from 'clsx'
import React, {useEffect, useState} from 'react';
import update from 'immutability-helper';

import {normalize, titleCase} from '../../utils';

import CreateIcon from '@material-ui/icons/Create';
import {Categories, Description, ExerciseName, Images, Muscles} from './form_fields'
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
    console.log(props.exercise)
    console.log(exercise)
    let classes = useStyles()
    useEffect(() => {
        setExercise(props.exercise)
    }, [props.exercise])

    function handleChange(property, value) {
        console.log(value)
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
            title={`${!!exercise.new ? 'New' : 'Edit'} Exercise`}
            interactive={!!props.exercise && !!props.exercise.edit}
            options={!props.exercise.edit && (<div onClick={() => props.onEditExercise(props.exercise)}><CreateIcon /></div>)}
            >
                <ExerciseName edit={!!props.exercise.edit} value={exercise.name} onChange={(value) => handleChange('name', value)}/>
                <Description edit={!!props.exercise.edit} value={exercise.description} onChange={(value) => handleChange('description', value)}/>
                <Categories edit={!!props.exercise.edit} value={exercise.category} onChange={(value) => handleChange('category', value)}/>
                <Muscles
                    edit={!!props.exercise.edit}
                    title='muscles'
                    name='muscles'
                    value={!!exercise.muscles ? exercise.muscles : []}
                    onChange={(value) => handleChange('muscles', value)}/>
                <Images
                    edit={!!props.exercise.edit}
                    value={!!exercise.images ? exercise.images : []}
                    onChange={(value) => handleChange('images', value)}/>

        </Modal>
    )
}
