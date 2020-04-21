import clsx from 'clsx'
import React, {useState} from  'react'

import {FormField, ResizeableInputTextArea} from '../../../../../utils'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './scheme.styles'
const useStyles = makeStyles(styles)

export const Scheme = props => {
    let classes = useStyles()
    // let [notes, setNotes] = useState(props.value)
    let [editing, setEditing] = useState(false)

    function handleSave(value) {
        // setNotes(value)
        setEditing(false)
        props.onChange(value)
    }

    return (
        <FormField
            condition={!!props.value || editing}
            title='scheme'
            onClick={() => setEditing(true)}
            >
                <ResizeableInputTextArea onSave={handleSave} value={props.value} />
        </FormField>
    )
}
