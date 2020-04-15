import React, {useEffect, useState} from 'react'
import update from 'immutability-helper'

import Block, {AddBlock} from './block'
import ClearIcon from '@material-ui/icons/Clear';
import {InputTitle} from '../../../../utils'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './day.styles'
const useStyles = makeStyles(styles)


export const Day = (props) => {
    let classes = useStyles()
    let [hover, setHover] = useState(false)
    function saveName(name) {
        let new_day = props.day
        new_day.name = name
        saveDay(new_day)
    }

    function saveDay(day) {
        day.index = props.index
        props.saveDay(day)
    }

    function emptyLastBlock(blocks) {
        return (!!blocks && (!blocks.length || (!!blocks.length && !!blocks[blocks.length - 1].workout_elements.length)))
    }

    return (
        <div ref={props.ref} className={classes.dayContainer}>
            <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={classes.day} >
                <div className={classes.dayHeader}>
                    <div className={classes.dayHeaderTitle}>
                        <InputTitle
                            placeholder='i.e. Chest, Monday, Day 1...'
                            value={!!props.day.name ? props.day.name : `Day ${props.index + 1}`}
                            focus={!!props.new}
                            onSave={saveName}/>
                    </div>
                    { !!hover && (<div className={classes.dayHeaderAction} onClick={props.deleteDay}><ClearIcon className={classes.action}/></div>)}
                </div>
                <div className={classes.dayContent}>
                {
                    props.day.workout_blocks.map((b,i) => (
                        <Block index={i} day_index={props.index} week_id={props.week_id} block={b}/>
                    ))
                }
                {
                    !!hover && emptyLastBlock(props.day.workout_blocks) && (
                        <AddBlock day_index={props.index} week_id={props.week_id}/>
                    )
                }
                </div>
            </div>
        </div>
    )
}
