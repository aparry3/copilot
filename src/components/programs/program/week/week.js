import React, {useState} from 'react'

import {AddDay} from './add_day'
import AddIcon from '@material-ui/icons/Add'
import Day from './day'
import DragAndDrop, {drag_and_drop_types as types} from '../../../utils/drag_and_drop'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './week.styles'
const useStyles = makeStyles(styles)

export const Week = (props) => {
    let classes = useStyles()
    let [over, setOver] = useState(false)
    let [adding_day, setAddingDay] = useState(false)

    async function addDay(day) {
        let new_day = await props.addDay(props.week, day)
        setAddingDay(false)
    }

    async function save(days) {
        await props.saveWeek({...props.week, days})
    }
    return (
        <div className={classes.weekContent}>
            { props.week.days.length > 0 || adding_day ? (
                <div className={classes.days}>
                    <DragAndDrop
                        parent={props.week._id}
                        save={save}
                        accept={types.DAY}
                        items={props.week.days}
                        renderItem={(d, i, r) => <Day ref={r} day={d} index={i} week_id={props.week._id}/>}
                        renderAddItem={(i, r) => (<AddDay ref={r} index={i} is_adding={adding_day} handleClick={() => setAddingDay(true)} addDay={addDay}/>)}
                        />
                </div>
            ) : (
                <div className={classes.emptyWeek}>
                    <div className={classes.emptyWeekMessage}>
                        <div className={classes.emptyWeekMessageText}>
                            <span>{`No days for week ${props.index + 1}. Click to add day.`}</span>
                        </div>
                        <div className={classes.addDayButtonContainer}>
                            <button className={"btn btn-primary"} onClick={() => setAddingDay(true)}>Add Day</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
