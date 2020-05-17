import clsx from 'clsx'
import React, {useState} from 'react'

import {FormField, ResizeableInputTextArea} from '../../../utils'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './form_fields.styles'
const useStyles = makeStyles(styles)


export const Description = props => {
    let classes = useStyles()
    let [editing, setEditing] = useState(false)

    function handleSave(value) {
        setEditing(false)
        props.onChange(value)
    }

    return (
        <FormField
            title='description'
            onClick={!!props.edit ? () => setEditing(true) : null}
            condition={!!props.value || editing}
            value={props.value}
            edit={props.edit}>
                <ResizeableInputTextArea onSave={handleSave} value={props.value} />
                <div>{props.value}</div>
        </FormField>
    )
}
