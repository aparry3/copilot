import {connect} from 'react-redux'
import {Day, AddDay} from './day'
import {Grid, List} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import React, {useState, useEffect} from 'react'
import update from 'immutability-helper';
import AddIcon from '@material-ui/icons/Add'

import {addDay, fetchWeek, persistWorkout} from '../../actions'


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
    },
    addDay: {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'blue'
    }
}
let useStyles = makeStyles(theme => styles)




export const Week = connect(
    null,
    (dispatch) => {
        return {
            persistWorkout: (week_id, day, workout) => dispatch(persistWorkout(week_id, day, workout)),
            addDay: (week_id, name) => dispatch(addDay(week_id, name))
        }
})((props) => {
    let {week} = props
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
                <div className={classes.list} >
                    {week.days.map((day, index) => {
                        return (
                            <Day
                                index={index}
                                key={`${week._id}-${day}`}
                                week_id={week._id}
                                save={(workouts) => save(workouts)}
                                day={day}
                                workout={week.days[day]} />
                        )
                    })}
                    <AddDay onAddDay={() => props.addDay(week._id, week)} />
                </div>
            )}
        </Grid>
    )
})
