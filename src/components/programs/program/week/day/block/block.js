import React, {useState} from 'react'

import AddExercise from './add_exercise_container'
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import WorkoutElement from './workout_element'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './block.styles'
const useStyles = makeStyles(styles)


export const Block = (props) => {
    let classes = useStyles()
    let [block, setBlock] = useState(props.block)

    let [hover, setHover] = useState(false)

    return (
        <div className={classes.blockContainer}>
            <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={classes.block}>
                <div className={classes.blockHeader}>
                    <div className={classes.blockHeaderTitle}>{!!props.block.workout_elements.length && (<div className={classes.actionContainer}><ExpandLessIcon className={classes.action}/></div>)}</div>
                    <div className={classes.blockHeaderActions}>
                        <div className={classes.actionContainer}><EditIcon className={classes.action} /></div>
                        <div className={classes.actionContainer} onClick={props.deleteBlock}><ClearIcon className={classes.action}/></div>
                    </div>
                </div>
            { !props.block.workout_elements.length && !hover && (<div className={classes.emptyBlock}><span>Click to add Workout Element</span></div>)}
            {
                props.block.workout_elements.map((we, i) => (
                    <WorkoutElement week_id={props.week_id} day_index={props.day_index} block_index={props.index} index={i} workout_element={we}/>
                ))
            }
            {!props.edit_workout_element && hover && (<AddExercise  week_id={props.week_id} day_index={props.day_index} block_index={props.index} />)}
            </div>
        </div>
    )
}
