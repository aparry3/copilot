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
            onClick={() => setEditing(true)}
            condition={!!props.value || editing}>
            <ResizeableInputTextArea onSave={handleSave} value={props.value} />
        </FormField>
    )
}
