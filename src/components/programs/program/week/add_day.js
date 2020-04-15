import clsx from 'clsx'
import React from 'react'

import AddIcon from '@material-ui/icons/Add'
import {NewDay} from './new_day'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './day/day.styles'
const useStyles = makeStyles(styles)

export const AddDay = React.forwardRef((props, ref) => {
    let classes = useStyles()
    return (
        <div ref={ref} className={classes.addDayContainer}>
            {   !!props.is_adding ? (
                <NewDay index={props.index} onSubmit={props.addDay} />
            ) : (
                <div className={classes.dayContainer}>
                    <div className={classes.day}>
                        <div className={classes.dayHeader}>
                            <span onClick={props.handleClick} className={classes.addDayText}><AddIcon /> New day</span>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
})
