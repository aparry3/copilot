import React, {useState} from 'react'

import {NewDay} from './new_day'
import AddIcon from '@material-ui/icons/Add'
import Day, {AddDay} from './day'

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

    return (
        <div className={classes.weekContent}>
            { props.week.days.length > 0 || adding_day ? (
                <div className={classes.days}>
                {props.week.days.map((d,i) => (
                    <Day day={d} index={i} week_id={props.week._id}/>
                ))}
                {   !!adding_day ? (
                    <NewDay index={props.week.days.length} onSubmit={addDay} />
                ) : (
                    <AddDay handleClick={() => setAddingDay(true)}/>
                )}
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
