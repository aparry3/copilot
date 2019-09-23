import React, {useRef} from 'react';
import {useDrop, useDrag} from 'react-dnd';
import {Grid, MenuItem, Button, List, ListItem, Typography, Divider, Card, CardActions, CardActionArea, CardContent} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import AutorenewIcon from '@material-ui/icons/Autorenew'
import AddIcon from '@material-ui/icons/Add'
import {combineExercises, moveWorkoutElement} from '../../actions';
import {dnd_types} from '../../constants/programs';
import SwapVertIcon from '@material-ui/icons/SwapVert'
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    day: {
        flexShrink: 0,
        width:'20%',
        flexDirection: 'column',
        paddingLeft: '5px',
        paddingRight: '5px'
    },
    dayList: {
        overflow: 'auto'
    },
    dayDropArea: {
        height:'100%'
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        height: '80px',
        marginBottom: '10px',
        background: 'white',
        boxShadow: '1px 1px 5px #dadada',
        padding: '5px 0 5px 10px',
        borderLeft: '5px lightblue',
        cursor: 'move'

    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    cardText: {
        height: '60%',
        alignSelf: 'flex-start',
        overflow:'hidden',
        textOverflow:  'ellipsis'
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
}));


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
        let {location, id, moveItem, ...pass_through_props} = props
        const ref = useRef(null)
        const [, drop] = useDrop({
            accept: dnd_types.WORKOUT_ELEMENT,
            hover(item, monitor) {
                if (!ref.current) {
                  return
                }
                const drag_location = item.location
                const hover_location = location
                // Don't replace items with themselves
                if (item.id != id) {
                  moveItem(drag_location, hover_location)
                }
                item.location = hover_location
            },
        })
        const [{ isDragging }, drag] = useDrag({
            item: { type: dnd_types.WORKOUT_ELEMENT, id, location},
            isDragging: (monitor) => {
                return monitor.getItem().id == id
            },
            collect: monitor => ({
                isDragging: monitor.isDragging(),
            }),
        })
        drag(drop(ref))
        return (
            <div ref={ref} >
                <WrappedComponent {...pass_through_props} />
            </div>
        )
    }
}

const DraggableWorkoutElement = draggable(WorkoutElement);


export const Day = (props) => {
    let {day, workout, week_id} = props;
    let classes = useStyles();

    return (
        <ListItem className={classes.day} >
            <div className={classes.dayDropArea}>

                <Typography variant="h6">{day}</Typography>
                <List className={classes.dayList}>
                    {workout.map((workout_element, workout_element_index) => {
                        let location = {
                            week_id,
                            day,
                            workout_element_index
                        }
                        return (
                            <DraggableWorkoutElement id={workout_element[0].id} moveItem={props.moveItem} location={location} workout_element={workout_element} classes={classes}/>
                        )
                    })}
                    <MenuItem onClick={() => props.onAddExercise(week_id, day)}>
                        <Typography variant="body2"><AddIcon /> Add Exercise</Typography></MenuItem>
                </List>
            </div>
        </ListItem>
    )
}
