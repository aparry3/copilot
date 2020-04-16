import clsx from 'clsx'
import React, {useState} from 'react'

import { allMuscles } from '../../../../constants/exercises';
import { titleCase } from '../../../utils';

import { CustomSelect, FormField } from '../../../utils';

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './form_fields.styles'
const useStyles = makeStyles(styles)


export const Muscles = props => {
    let classes = useStyles()
    let [editing, setEditing] = useState(false)
    let all_muscles = allMuscles()

    function transform(value) {
        return value.map(y => all_muscles.find(m => m.name == y))
    }

    function handleChange(e) {
        setEditing(false)
        props.onChange(transform(e.target.value))
    }


    return (
        <FormField
            title={props.title}
            condition={!!props.value.length || editing}
            onClick={() => setEditing(true)}
            >
            <CustomSelect multiple placeholder={`Add ${props.title}...`} name={props.name} onChange={handleChange} value={props.value.map(m => m.name)} elements={all_muscles.map(m => m.name)} />
        </FormField>
    )
}
