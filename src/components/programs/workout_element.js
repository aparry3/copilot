import AutorenewIcon from '@material-ui/icons/Autorenew'
import {Card, Divider, List, ListItem, Typography} from '@material-ui/core'
import {connect} from 'react-redux'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import {dragAndDrop} from './drag_and_drop'
import {makeStyles} from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import React, {useRef, useState} from 'react';
import SwapVertIcon from '@material-ui/icons/SwapVert'
import {useDrop} from 'react-dnd'

import {dnd_types} from '../../constants/programs'

const styles = theme => ({
    exerciseContent: {
        display: 'flex',
        height:' 100%',
        width: '100%',
        flexDirection: 'row',
        borderRadius: 'inherit',
        cursor: 'move'

    },
    exerciseBlock: {
        borderRadius: '10px',
        background: theme.palette.background.light,
        height: '100px',
        width: '85%',
        position: 'relative',
        margin: '0px 0px 10px 0px',
        boxShadow: `0px 1px 8px -5px ${theme.palette.background.dark}`

    },
    dragAndDrop: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        opacity: 0
    },
    workoutElement: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    hoverOverlay: {
        height:'100%',
        width: '100%',
        borderRadius: '10px',
        background: '#000000',
        opacity: 0.5,
        position: 'absolute'
    },
    supersetBlock: {
        width: '90%',
        background: theme.palette.secondary.main,
        borderRadius: '10px',
        margin: '0px 0px 10px 0px'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    exerciseHeader: {
        height: '40%',
        width: '100%',
        borderRadius: '10px 10px 0px 0px',
        background: theme.accents.primary,
        display: 'flex',
        flexDirection: 'row',
        overflow:'hidden',
        textOverflow:  'ellipsis',
        color: theme.text.dark,
        color: "black"
    },
    cardIcons: {
        height: '40%',
        alignSelf: 'flex-end',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end'

    },
    detailIcon: {
        display: 'flex',
        flexDirection: 'row'
    },
    drag: {
        alignSelf: 'center'
    }
})
let useStyles = makeStyles(styles)


const ExerciseView = (props) => {
    let {
        workout_element,
        deleteWorkoutElement,
        merge
    } = props;
    let classes = useStyles()
    return (
        <>
            {merge && (<div className={classes.hoverOverlay}/>)}
            <div className={classes.exerciseContent} >
                <div onClick={() => props.editWorkoutElement(props.location)} className={classes.cardContent}>
                    <div className={classes.exerciseHeader}>
                        <Typography gutterBottom variant="body1">
                            {workout_element.exercise_name}
                        </Typography>
                        <DeleteOutlineIcon onClick={deleteWorkoutElement} />

                    </div>
                    <div className={classes.cardIcons}>
                        <div className={classes.detailIcon}>
                            <AutorenewIcon fontSize="small"/><Typography >5</Typography>
                        </div>
                        <div className={classes.detailIcon}>
                            <SwapVertIcon fontSize="small"/><Typography >5</Typography>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const SupersetView = (props) => {
    let {
        workout_element,
        location,
        deleteWorkoutElement,
        removeItem,
        ...pass_through_props
    } = props
    const [, drop] = useDrop({
        accept: dnd_types.EXERCISE,
    })
    let classes = useStyles()
    return (
        <>
            <DeleteOutlineIcon onClick={deleteWorkoutElement} />
            <div className={classes.superset} ref={drop}>
                <List>
                    {workout_element.exercises.map((ex, ex_index)=> {
                        let superset_location = {...location}
                        superset_location.superset_index = ex_index
                        return (
                            <div className={classes.exerciseBlock} >
                                <NonMergeableExercise
                                    key={`${ex.exercise_id}-${ex_index}`}
                                    variant='mergeable'
                                    item_type={dnd_types.EXERCISE}
                                    accept={dnd_types.EXERCISE}
                                    workout_element={ex}
                                    removeItem={removeItem}
                                    location={superset_location}
                                    classes={classes}
                                    {...pass_through_props}/>
                            </div>
                        )
                    })}
                </List>
            </div>
        </>
    )

}

export const WorkoutElement = (props) => {
    let {removeItem, ...pass_through_props} = props
    let classes = useStyles()
    let [confirm_delete_open, setConfirmDeleteOpen] = useState(false)
    function deleteWorkoutElement() {
        let workout = removeItem(props.location, true)
        props.save(workout)
    }
    return (
        <div className={classes.workoutElement}>
            {!props.workout_element.exercise_id ? (
                <div className={classes.supersetBlock}>

                    <Superset
                        deleteWorkoutElement={deleteWorkoutElement}
                        item_type={dnd_types.SUPERSET}
                        accept={[dnd_types.SUPERSET, dnd_types.EXERCISE]}
                        removeItem={removeItem}
                        classes={classes}
                        {...pass_through_props} />
                </div>
                 ) : (
                 <div className={classes.exerciseBlock} >
                     <MergeableExercise
                         deleteWorkoutElement={deleteWorkoutElement}
                         variant='mergeable'
                         item_type={dnd_types.EXERCISE}
                         accept={[dnd_types.SUPERSET, dnd_types.EXERCISE]}
                         removeItem={removeItem}
                         classes={classes}
                         {...pass_through_props}/>
                 </div>

            )}
        </div>
    )
}

export const Superset = dragAndDrop(true, true, false)(SupersetView);
export const MergeableExercise = dragAndDrop(true, true, true)(ExerciseView)
export const NonMergeableExercise = dragAndDrop(true, true, false)(ExerciseView)
