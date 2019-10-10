import React, {useRef, useState, useEffect} from 'react';
import {useDrop, useDrag} from 'react-dnd'
import {connect} from 'react-redux'
import {dnd_types} from '../../constants/programs'
import {List, ListItem, Typography, Card, Divider} from '@material-ui/core'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import SwapVertIcon from '@material-ui/icons/SwapVert'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {setDragElement} from '../../actions'

const ExerciseView = (props) => {
    let {workout_element, classes, merge} = props;
    return (
        <Card className={classes.card}>
            {merge && (<div style={{height: '100%', width:'100%', background: 'black', zIndex: '100'}}/>)}
            <div className={classes.cardContent}>
                <div className={classes.cardText}>
                    <Typography gutterBottom variant="body2">
                        {workout_element.exercise_name}
                    </Typography>
                </div>
                <Divider variant="middle" />
                <div className={classes.cardIcons}>
                    <div className={classes.detailIcon}>
                        <AutorenewIcon fontSize="small"/><Typography >5</Typography>
                    </div>
                    <div className={classes.detailIcon}>
                        <SwapVertIcon fontSize="small"/><Typography >5</Typography>
                    </div>
                </div>
            </div>
            <div className={classes.drag}>
                <MoreVertIcon fontSize="small"/>
            </div>
        </Card>
    )
}

const SupersetView = (props) => {
    let {workout_element, classes, location, locationCallback, ...pass_through_props} = props
    const [, drop] = useDrop({
        accept: dnd_types.EXERCISE,
    })

    return (
        <>
            <Card style={{padding:'10px'}}>
                <div className={classes.superset} ref={drop}>
                    <List>
                        {workout_element.exercises.map((ex, ex_index)=> {
                            let superset_location = {...location}
                            superset_location.superset_index = ex_index
                            return (<ListItem key={`${ex.name}`}><NonMergeableExercise variant='mergeable' item_type={dnd_types.EXERCISE} accept={dnd_types.EXERCISE} workout_element={ex} removeItem={locationCallback} location={superset_location} classes={classes} elem={ex} {...pass_through_props}/></ListItem>)
                        })}
                    </List>
                </div>
            </Card>
        </>
    )

}

export const WorkoutElement = (props) => {
    let {locationCallback, ...pass_through_props} = props
    return (
        <>
            {!props.workout_element.exercise_id ? (
                <Superset item_type={dnd_types.SUPERSET} accept={[dnd_types.SUPERSET, dnd_types.EXERCISE]} locationCallback={locationCallback} removeItem={locationCallback} {...pass_through_props} />
                 ) : (
                <MergeableExercise variant='mergeable' item_type={dnd_types.EXERCISE} accept={[dnd_types.SUPERSET, dnd_types.EXERCISE]} removeItem={locationCallback} {...pass_through_props}/>
            )}
        </>
    )
}

function dragAndDrop(draggable = true, droppable = true, mergeable = true, options = null) {
    return (WrappedComponent) => {
        return (props) => {
            let {elem, variant, removeItem, item_type, accept, ...pass_through_props} = props
            let [merge, setMerge] = useState(false)
            let can_merge = !!variant && variant == 'mergeable'
            let ref = useRef(null)
            function sameLocation(old_l, new_l) {
                return (
                    old_l.superset_index == new_l.superset_index &&
                    old_l.workout_element_index == new_l.workout_element_index &&
                    old_l.day == new_l.day &&
                    old_l.week_id == new_l.week_id
                )
            }
            const [{isOver}, drop] = useDrop({
                accept,
                hover(item, monitor) {
                    if (!ref.current) {
                      return
                    }
                    if (monitor.isOver({shallow: true})) {
                        const drag_location = item.location
                        const hover_location = props.location
                        // Don't replace items with themselves
                        function shouldMerge() {
                            if (!item.can_merge || !mergeable) {
                                return false
                            }
                            let {x, y} = monitor.getClientOffset()
                            let client_bounding_rect = ref.current.getBoundingClientRect()
                            let middle_y = (client_bounding_rect.bottom - client_bounding_rect.top) / 2
                            let client_y = y - client_bounding_rect.top
                            return client_y > middle_y
                        }
                        if (!sameLocation(drag_location, hover_location)) {
                            if (shouldMerge()) {
                                setMerge(true)
                            } else {
                                setMerge(false)
                                let new_location = props.moveItem(
                                    hover_location,
                                    drag_location,
                                    item.moveCallback
                                )
                                item.location = new_location
                                item.moveCallback = removeItem

                            }
                        }
                    }
                },
                drop: (item, monitor) => {
                    if (monitor.didDrop()) {
                        return
                    }
                    if (merge) {
                        props.moveItem(props.location, item.location, item.moveCallback, true)
                        setMerge(false)
                    }
                },
                collect: monitor => ({
                    isOver: !!monitor.isOver({shallow: true})
                })
            })
            useEffect(() => {
                setMerge(false)
            }, [isOver])
            const [{ isDragging }, drag] = useDrag({
                item: { type: item_type, can_merge, id:`${Math.floor(Math.random()*100000)}`, location: props.location, moveCallback:removeItem},
                isDragging: monitor => {
                    return sameLocation(monitor.getItem().location, props.location)
                },
                collect: monitor => ({
                    isDragging: monitor.isDragging()
                }),
            })
            drag(drop(ref))
            let opacity = isOver ? 0.5 : 1
            return (
                <div ref={ref} style={{opacity}}>
                    <WrappedComponent merge={merge} {...pass_through_props} />
                </div>
            )
        }
    }
}

export const Superset = dragAndDrop(true, true, false)(SupersetView);
export const MergeableExercise = dragAndDrop(true, true, true)(ExerciseView)
export const NonMergeableExercise = dragAndDrop(true, true, false)(ExerciseView)
