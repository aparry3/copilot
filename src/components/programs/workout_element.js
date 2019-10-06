import React, {useRef, useState} from 'react';
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
                        {workout_element.name}
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
    let {workout_element, classes, location, ...pass_through_props} = props
    const [, drop] = useDrop({
        accept: dnd_types.WORKOUT_ELEMENT,
    })
    return (
        <div className={classes.superset} ref={drop}>
            <List>
                {workout_element.map((ex, ex_index)=> {
                    let superset_location = {...location}
                    superset_location.superset_index = ex_index
                    return (<ListItem key={`${ex.name}`}><NonMergeableExercise workout_element={ex} location={superset_location} classes={classes} elem={ex} {...pass_through_props}/></ListItem>)
                })}
            </List>
        </div>
    )
}

export const WorkoutElement = (props) => {
    return (
        <>
            {Array.isArray(props.workout_element) ? (
                <Superset {...props} />
                 ) : (
                <MergeableExercise {...props}/>
            )}
        </>
    )
}

function dragAndDrop(draggable = true, droppable = true, mergeable = true, options = null) {
    return (WrappedComponent) => {
        return (props) => {
            let {elem, ...pass_through_props} = props
            let [merge, setMerge] = useState(false)
            const ref = useRef(null)
            function sameLocation(old_l, new_l) {
                return (
                    old_l.superset_index == new_l.superset_index &&
                    old_l.workout_element_index == new_l.workout_element_index &&
                    old_l.day_index == new_l.day_index &&
                    old_l.week_index == new_l.week_index
                )
            }
            const [{isOver}, drop] = useDrop({
                accept: dnd_types.WORKOUT_ELEMENT,
                hover(item, monitor) {
                    if (!ref.current) {
                      return
                    }
                    if (monitor.isOver({shallow: true})) {
                        const drag_location = item.location
                        const hover_location = props.location
                        // Don't replace items with themselves
                        function shouldMerge() {
                            if (!mergeable) {
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
                                props.moveItem(
                                    hover_location,
                                    item.moveCallback
                                )
                                item.location = hover_location
                                item.moveCallback = props.removeItem

                            }
                        }
                    }
                },
                drop: (item, monitor) => {
                    if (monitor.didDrop()) {
                        return
                    }
                    if (merge) {
                        props.moveItem(props.location, item.moveCallback, true)
                        setMerge(false)
                    }
                },
                collect: monitor => ({
                    isOver: !!monitor.isOver()
                })
            })
            const [{ isDragging }, drag] = useDrag({
                item: { type: dnd_types.WORKOUT_ELEMENT, location: props.location, moveCallback:props.removeItem},
                isDragging: monitor => {
                    return sameLocation(monitor.getItem().location, props.location)
                },
                begin: monitor => {
                    console.log(props.location)
                },
                collect: monitor => ({
                    isDragging: monitor.isDragging(),
                }),
            })
            drag(drop(ref))
            return (
                <div ref={ref}>
                    <WrappedComponent merge={merge} {...pass_through_props} />
                </div>
            )
        }
    }
}

export const Superset = dragAndDrop(true, true, false)(SupersetView);
export const MergeableExercise = dragAndDrop(true, true, true)(ExerciseView)
export const NonMergeableExercise = dragAndDrop(true, true, false)(ExerciseView)
