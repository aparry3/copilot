import clsx from 'clsx'
import React, {useState} from  'react'

import {schemes} from '../../../../../../constants/workout_elements'

import {CustomSelect} from '../../../../../utils'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './scheme_select.styles'
const useStyles = makeStyles(styles)

export const SchemeSelect = props => {
    let classes = useStyles()
    let [editing, setEditing] = useState(false)

    function select(e) {
        setEditing(false)
        props.onChange(e.target.value)
    }
    return (
        <div className={classes.schemeSelect}>
            {(!!props.value && !!props.value.length || editing) ? (
                <CustomSelect
                    right
                    multiple
                    focus
                    onBlur={() => setEditing(false)}
                    value={props.value}
                    name='scheme'
                    no_filter
                    onChange={select}
                    elements={Object.values(schemes).map(s => s.type)}/> ) : (
                <div onClick={() => setEditing(true)} className={classes.emptySchemeSelect}><span>Choose scheme...</span></div>
                )
            }
        </div>
    )
}
