import React, {useEffect, useState} from 'react'
import update from 'immutability-helper'

import Block, {AddBlock} from './block'
import ClearIcon from '@material-ui/icons/Clear';
import DragAndDrop, {drag_and_drop_types as types} from '../../../../utils/drag_and_drop'
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

    async function saveBlocks(blocks) {
        console.log(props.day.name)
        await props.saveDay({...props.day, workout_blocks: blocks})
    }

    function emptyLastBlock(blocks) {
        return (!!blocks && (!blocks.length || (!!blocks.length && !!blocks[blocks.length - 1].workout_elements.length)))
    }

    function addBlock(ref) {
        return (
            <>
                {!!hover && emptyLastBlock(props.day.workout_blocks) && (
                    <AddBlock ref={ref} day_index={props.index} week_id={props.week_id}/>
                )}
            </>
        )
    }

    return (
        <div ref={props.forwardRef} className={classes.dayContainer}>
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
                    <DragAndDrop
                        parent={`${props.week_id}-${props.index}`}
                        save={saveBlocks}
                        accept={types.BLOCK}
                        items={props.day.workout_blocks}
                        renderItem={(b, i, r) => <Block ref={r} index={i} day_index={props.index} week_id={props.week_id} block={b}/>}
                        renderAddItem={(i, r) => addBlock(r)}
                        />
                </div>
            </div>
        </div>
    )
}
