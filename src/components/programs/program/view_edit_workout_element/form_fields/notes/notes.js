import clsx from 'clsx'
import React, {useState} from  'react'

import {ResizeableInputTextArea} from '../../../../../utils'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './notes.styles'
const useStyles = makeStyles(styles)

export const Notes = props => {
    let classes = useStyles()
    // let [notes, setNotes] = useState(props.value)
    let [editing, setEditing] = useState(false)

    function handleSave(value) {
        // setNotes(value)
        setEditing(false)
        props.onChange(value)
    }

    return (
        <div className={classes.formFieldContainer}>
            { !!props.value || editing ? (
                <>
                    <div className={classes.formFieldHeader}>
                        <span>NOTES</span>
                    </div>
                    <div className={classes.formFieldContent}>
                        <ResizeableInputTextArea onSave={handleSave} value={props.value} />
                    </div>
                </>
            ) : (
                <div onClick={() => setEditing(true)} className={clsx(classes.formFieldHeader, classes.emptyForm)}>
                    <span>Add notes...</span>
                </div>
            )}
        </div>
    )
}
