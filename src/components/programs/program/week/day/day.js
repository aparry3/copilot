import React, {useEffect, useState} from 'react'

import Block from './block'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './day.styles'
const useStyles = makeStyles(styles)

const EmptyDay = props => {
    let classes = useStyles()
    return (
        <div className={classes.empyDay}>
        </div>
    )
}

export const Day = (props) => {
    let classes = useStyles()
    let [day, setDay] = useState(props.day)

    return (
        <div>
            <InputTitle
                placeholder='i.e. Chest, Monday, Day 1...'
                value={!!props.day.name ? props.day.name : `Day ${props.index + 1}`}
                focus={!!props.new}
                onSave={props.saveProgram}/>
            {
                props.day.workout_blocks.length > 0 ? (
                    props.day.workout_blocks.map(b => (
                        <Block block={b}/>
                    ))
                ) : (
                    <EmptyDay />
                )
            }
        </div>
    )
}
