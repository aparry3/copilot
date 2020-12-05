import clsx from 'clsx'
import React, {useState} from 'react'

import { titleCase } from '../../../../utils';

import { CustomSelect, FormField, MultiSelectView } from '../../../../utils';

import {makeStyles} from '@material-ui/core/styles';
import {styles} from '../form_fields.styles'
const useStyles = makeStyles(styles)


export const Muscles = props => {
    let classes = useStyles()
    let [editing, setEditing] = useState(false)

    function transform(value) {
        return value.map(y => props.muscles_map.find(m => m.name == y).id)
    }

    function handleChange(e) {
        setEditing(false)
        props.onChange(transform(e.target.value))
    }

    return (
        <FormField
            title={props.title}
            condition={!!props.value.length || editing}
            onClick={!!props.edit ? () => setEditing(true) : null}
            edit={props.edit}
            value={props.value}
            >
            <CustomSelect
                multiple
                placeholder={`Add ${props.title}...`}
                name={props.name}
                onChange={handleChange}
                value={props.value.map(m => props.muscles_map[m].name)}
                elements={props.muscles_map.map(m => m.name)} />
            <MultiSelectView values={props.value.map(m => props.muscles_map[m].name)} />
        </FormField>
    )
}
