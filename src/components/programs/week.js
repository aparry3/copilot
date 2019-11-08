import {connect} from 'react-redux'
import {Day} from './day'
import {Grid, List} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import React, {useState, useEffect} from 'react'

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

export const Week = (props) => {
    let {week_id, index} = props;
    let [week, setWeek] = useState(null)
    let [week_did_load, setWeekDidLoad] = useState(false)
    let classes = useStyles()
    useEffect(() => {
        async function loadWeek() {
            let week = await fetchWeek(week_id)
            setWeek(week)
            setWeekDidLoad(true)
        }
        loadWeek()
    }, [week_did_load])
    return (
        <Grid item xs={12} className={classes.week}>
            {!!week_did_load && (
                <List className={classes.list} >
                    {Object.keys(week.days).map((day) => {
                        return (
                            <Day
                                key={`${week_id}-${day}`}
                                week_id={week_id}
                                save={(workout) => persistWorkout(week_id, day, workout)}
                                day={day}
                                workout={week.days[day]} />
                        )
                    })}
                </List>
            )}
        </Grid>
    )
}
