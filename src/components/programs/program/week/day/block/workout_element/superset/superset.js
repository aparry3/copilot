import React from 'react'

import {details} from '../../../../../../../utils'

import Exercise from '../exercise'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './superset.styles'
const useStyles = makeStyles(styles)

export const Superset = props => {
    let classes = useStyles()
    console.log(details)
    return (
        <div className={classes.supersetContainer}>
            <div className={classes.supersetContent}>
            { props.superset.exercises.map(e => (
                <div className={classes.exerciseContainer}>
                    <div className={classes.exercise}>
                        <Exercise exercise={e} />
                    </div>
                </div>
            ))
            }
            </div>
            { Object.keys(props.superset.details).length > 0 && (
                <div className={classes.supersetDetails}>
                    {Object.keys(props.superset.details).map(k => details[k].value(props.superset.details[k]))}
                </div>
            )}
        </div>
    )
}
