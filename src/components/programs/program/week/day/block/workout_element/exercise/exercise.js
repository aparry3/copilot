import clsx from 'clsx'
import React from 'react'

import ClearIcon from '@material-ui/icons/Clear';

import {details} from '../../../../../../../utils'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './exercise.styles'
const useStyles = makeStyles(styles)

export const Exercise = props => {
    let classes = useStyles()
    console.log(props.exercise)

    function handleDelete(e) {
        e.stopPropagation()
        e.preventDefault()
        props.delete()
    }

    return (
        <div className={clsx(classes.exerciseContainer, !!props.exercise.scheme && !!props.exercise.scheme.length ? classes.schemeColor : classes.exerciseColor)}>
            <div className={classes.exerciseHeader}>
                <div className={classes.exerciseHeaderText}>
                    <span>{props.exercise.exercise.name}</span>
                </div>
                { !!props.deletable && (
                    <div className={classes.exerciseHeaderAction}>
                        <div onClick={handleDelete} className={classes.actionContainer}>
                            <ClearIcon className={classes.action} />
                        </div>
                    </div>
                )}
            </div>
            <div className={classes.exerciseContent}>
                { !!props.exercise.notes && (
                    <div className={classes.exerciseNotes}>
                        {props.exercise.notes}
                    </div>
                )}
                { Object.keys(props.exercise.details).length > 0 && (
                    <div className={classes.exerciseDetails}>
                        {Object.keys(props.exercise.details).map(k => details[k].value(props.exercise.details[k]))}
                    </div>
                )}
            </div>
        </div>
    )
}
