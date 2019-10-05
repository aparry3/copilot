import React, {useState} from 'react'
import {Grid, List} from '@material-ui/core'
import {Day} from './day'
import {connect} from 'react-redux'

export const Week = (props) => {
    let {week, week_index, classes, moveItem } = props;

    return (
        <Grid item xs={12} className={classes.week}>
            <List className={classes.list} >
            {week.map((day, index) => {
                return (<Day key={`${week_index}-${index}`} moveItem={moveItem} week_index={week_index} day_index={index} workout={day} onAddExercise={props.onAddExercise}/>)
            })}
            </List>
        </Grid>
    )
}
