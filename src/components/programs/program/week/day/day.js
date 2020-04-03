import React, {useEffect, useState} from 'react'
import update from 'immutability-helper'

import Block, {AddExercise} from './block'
import ClearIcon from '@material-ui/icons/Clear';
import {InputTitle} from '../../../../utils'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './day.styles'
const useStyles = makeStyles(styles)


export const Day = (props) => {
    let classes = useStyles()

    function saveName(name) {
        let new_day = props.day
        new_day.name = name
        saveDay(new_day)
    }

    function saveDay(day) {
        day.index = props.index
        props.saveDay(day)
    }

    return (
        <div className={classes.dayContainer}>
            <div className={classes.day} >
                <div className={classes.dayHeader}>
                    <InputTitle
                        placeholder='i.e. Chest, Monday, Day 1...'
                        value={!!props.day.name ? props.day.name : `Day ${props.index + 1}`}
                        focus={!!props.new}
                        onSave={saveName}/>
                </div>
                <div className={classes.dayContent}>
                {
                    props.day.workout_blocks.map((b,i) => (
                        <Block index={i} day_index={props.index} week_id={props.week_id} block={b}/>
                    ))
                }
                </div>
            </div>
        </div>
    )
}
