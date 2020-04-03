import React, {useState} from 'react'

import AddExercise from './add_exercise_container'
import WorkoutElement from './workout_element'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './block.styles'
const useStyles = makeStyles(styles)


export const Block = (props) => {
    let classes = useStyles()
    let [block, setBlock] = useState(props.block)

    return (
        <div className={classes.blockContainer}>
            {
                props.block.workout_elements.map((we, i) => (
                    <WorkoutElement week_id={props.week_id} day_index={props.day_index} block_index={props.index} index={i} workout_element={we}/>
                ))
            }
            {!props.edit_workout_element && (<AddExercise  week_id={props.week_id} day_index={props.day_index} block_index={props.index} />)}
        </div>
    )
}
