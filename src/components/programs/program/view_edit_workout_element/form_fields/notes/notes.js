import clsx from 'clsx'
import React, {useState} from  'react'

import {FormField, ResizeableInputTextArea} from '../../../../../utils'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './notes.styles'
const useStyles = makeStyles(styles)

export const Notes = props => {
    let classes = useStyles()
    let [editing, setEditing] = useState(false)

    function handleSave(value) {
        setEditing(false)
        props.onChange(value)
    }

    return (
        <FormField
            condition={!!props.value || editing}
            title='notes'
            onClick={() => setEditing(true)}
            >
                <ResizeableInputTextArea focus={editing} onSave={handleSave} value={props.value} />
        </FormField>
    )
}
