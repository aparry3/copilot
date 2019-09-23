import React from 'react'
import {Grid, List} from '@material-ui/core'
import {Day} from './day'

export const Week = (props) => {

    let {week_id, week, classes} = props;
    return (
        <Grid item xs={12} className={classes.week}>
            <List className={classes.list} >
            {Object.keys(week).map((day) => {
                return (<Day key={`${week_id}-${day}`} moveItem={props.moveItem} week_id={week_id} day={day} workout={week[day]} classes={classes} onAddExercise={props.onAddExercise}/>)
            })}
            </List>
        </Grid>

    )
}
