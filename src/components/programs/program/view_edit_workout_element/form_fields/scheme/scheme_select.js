import clsx from 'clsx'
import React, {useState} from  'react'

import {CustomSelect} from '../../../../../utils'


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

    function select(e) {
        props.onChange(e.target.value)
    }

    return (
        <div className={classes.schemeSelect}>
            {(!!props.value && !!props.value.types && !!props.value.types.length || editing) ? (
                <CustomSelect
                    value={props.value.types}
                    name='scheme'
                    onChange={select}
                    elements={schemes}
                    placeholder={`Exercise name...`}/> ) : (
                <div className={classes.exmptySchemeSelect}><span>Choose scheme...</span></div>
                )
            }
        </div>
    )
}
