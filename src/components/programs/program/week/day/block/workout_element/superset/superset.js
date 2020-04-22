import clsx from 'clsx'
import React, {useState} from 'react'

import {details} from '../../../../../../../utils'

import ClearIcon from '@material-ui/icons/Clear';
import Exercise from '../exercise'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './superset.styles'
const useStyles = makeStyles(styles)

export const Superset = props => {
    let classes = useStyles()

    let [hover_action, setHoverAction] = useState(false)
    let [hover, setHover] = useState(false)

    function handleHover(e, value) {
        e.stopPropagation()
        e.preventDefault()
        setHoverAction(true)
    }

    function handleDelete(e) {
        e.stopPropagation()
        e.preventDefault()
        props.delete()
    }

    function title() {
        return !!props.superset.scheme && !!props.superset.scheme.length ? props.superset.scheme.join(', ') : !!props.exercises.length > 2 ? 'Circuit' : 'Superset'
    }

    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={clsx(classes.supersetContainer, !!props.superset.scheme && !!props.superset.scheme.length ? classes.schemeColor : classes.supersetColor)}>
            <div className={classes.supersetHeader}>
                <div className={classes.supersetHeaderTitle}>
                    <span>{title()}</span>
                </div>
                <div className={classes.supersetHeaderActionContainer}>
                    <div onClick={handleDelete}
                        onMouseEnter={(e) => handleHover(e, true)}
                        onMouseLeave={(e) => handleHover(e, false)}
                        className={classes.supersetHeaderAction}>
                        <ClearIcon className={classes.action}/>
                    </div>
                </div>
            </div>
            <div className={classes.supersetContent}>
            { props.superset.exercises.map(e => (
                <div className={classes.exerciseContainer}>
                    { !!props.superset.alternate && (
                    <div className={classes.alternateDetail}>
                        {e.alternate_detail}
                    </div>
                    )}
                    <div className={classes.exercise}>
                        <Exercise exercise={e} />
                    </div>
                </div>
            ))
            }
            { !!props.superset.notes && (
                <div className={classes.supersetNotes}>
                    {props.superset.notes}
                </div>
            )}
            { Object.keys(props.superset.details).length > 0 && (
                <div className={classes.supersetDetails}>
                    {Object.keys(props.superset.details).map(k => details[k].value(props.superset.details[k]))}
                </div>
            )}
            </div>
        </div>
    )
}
