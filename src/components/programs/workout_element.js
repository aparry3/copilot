import React, {useRef} from 'react';
import {useDrop, useDrag} from 'react-dnd'
import {connect} from 'react-redux'
import {dnd_types} from '../../constants/programs'
import {List, ListItem, Typography, Card, Divider} from '@material-ui/core'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import SwapVertIcon from '@material-ui/icons/SwapVert'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {setDragElement} from '../../actions'

const Exercise = (props) => {
    let {workout_element, classes} = props;
    let exercise = workout_element[0]
    return (
        <div >
            <Card className={classes.card}>
                <div className={classes.cardContent}>
                    <div className={classes.cardText}>
                        <Typography gutterBottom variant="body2">
                            {exercise.exercise_name}
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
        </div>
    )
}

const Superset = (props) => {
    let {workout_element} = props
    return (
        <div>
            <List>
                {workout_element.exercises.map((ex, ex_index)=> {
                    return (<ListItem key={`${ex.name}`}><Exercise  sub_index={ex_index} {...props}/></ListItem>)
                })}
            </List>
        </div>
    )
}

const WorkoutElement = (props) => {
    let {workout_element} = props
    return (
        <div>
            {workout_element.length > 1 ? (
                <Superset {...props} />
                 ) : (
                <Exercise {...props}/>
            )}
        </div>
    )
}

function draggable(WrappedComponent) {
    return (props) => {
        let {location, id, moveItem, elem, setDragElement, ...pass_through_props} = props
        const ref = useRef(null)
        const [{isOver}, drop] = useDrop({
            accept: dnd_types.WORKOUT_ELEMENT,
            hover(item, monitor) {
                if (!ref.current) {
                  return
                }
                const drag_location = item.location
                const hover_location = location
                // Don't replace items with themselves
                if (drag_location.workout_element_index != hover_location.workout_element_index) {
                  moveItem(drag_location, hover_location)
                }
                item.location = hover_location
            },
            collect: monitor => ({
                isOver: !!monitor.isOver()
            })
        })
        const [{ isDragging }, drag] = useDrag({
            item: { type: dnd_types.WORKOUT_ELEMENT, id, location},
            begin: (monitor) => {
                    console.log(elem)
                    setDragElement(elem)
            },
            collect: monitor => ({
                isDragging: monitor.isDragging(),
            }),
        })
        drag(drop(ref))
        let opacity = isOver ? 0:1
        return (
            <div ref={ref} style={{opacity}}>
                <WrappedComponent {...pass_through_props} />
            </div>
        )
    }
}

export const DraggableWorkoutElement = connect(
    null,
    dispatch => ({
        setDragElement: (element) => dispatch(setDragElement(element))
    })
)(draggable(WorkoutElement));
