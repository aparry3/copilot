import {connect} from 'react-redux'
import {Day} from './day'
import {Grid, List} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import React, {useState, useEffect} from 'react'
import update from 'immutability-helper';

import {fetchWeek, persistWorkout} from '../../actions'


const styles = {
    list: {
        display: 'flex',
        flexDirection: 'row',
        height: '92%',
        paddingLeft: '5px',
        paddingRight: '5px',
        paddingTop: '0px'
    },
    week: {
        width: '140%',
        height: '100%',
        overflow: 'auto'
    },
    weekNumber: {
        fontSize: '20px'
    }
}
let useStyles = makeStyles(theme => styles)

export const Week = connect(
    null,
    (dispatch) => {
        return {
            persistWorkout: (week_id, day, workout) => dispatch(persistWorkout(week_id, day, workout))
        }
})((props) => {
    let [week, setWeek] = useState(props.week)

    let classes = useStyles()
    function save(workouts) {
        let new_week = {...week}
        workouts.forEach(wo => {
            new_week = update(new_week, {
                days: {[wo[0]]: {workout_elements: {$set: wo[1]}}}
            })
            props.persistWorkout(week._id, wo[0], wo[1])
        })

    }
    return (
        <Grid item xs={12} className={classes.week}>
            {!!week && (
                <List className={classes.list} >
                    {Object.keys(week.days).map((day) => {
                        return (
                            <Day
                                key={`${week._id}-${day}`}
                                week_id={week._id}
                                save={(workouts) => save(workouts)}
                                day={day}
                                workout={week.days[day]} />
                        )
                    })}
                </List>
            )}
        </Grid>
    )
})
