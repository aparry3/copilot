import React from 'react'

import {NewExercise} from '../exercise'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './new_superset.styles'
const useStyles = makeStyles(styles)


export const NewSuperset = props => {
    let classes = useStyles()

    return (
        <div className={classes.supersetContainer}>
            <div className={classes.supersetContent}>
                <div className={classes.exerciseContainer}>
                    <div className={classes.exercise}>
                        <NewExercise />
                    </div>
                </div>
                <div className={classes.exerciseContainer}>
                    <div className={classes.exercise}>
                        <NewExercise />
                    </div>
                </div>
            </div>
            <div className={classes.supersetDetails}>
                <div className={classes.placeholderDetails} />
            </div>
        </div>
    )
}
