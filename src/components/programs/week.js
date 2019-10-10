import React, {useState, useEffect} from 'react'
import {Grid, List} from '@material-ui/core'
import {Day} from './day'
import {connect} from 'react-redux'
import {fetchWeek} from '../../actions'

export const Week = (props) => {
    let {week_id, classes} = props;
    let [week, setWeek] = useState(null)
    let [week_did_load, setWeekDidLoad] = useState(false)
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
                return (<Day key={`${week_id}-${day}`} day={day} workout={week.days[day]} onAddExercise={props.onAddExercise}/>)
            })}
            </List>)}
        </Grid>
    )
}
