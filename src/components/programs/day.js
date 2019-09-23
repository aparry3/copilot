import React, {useRef, useState} from 'react';
import {useDrop, useDrag} from 'react-dnd';
import {connect} from 'react-redux'
import {Grid, MenuItem, Button, List, ListItem, Typography, Divider, Card, CardActions, CardActionArea, CardContent} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add'
import {combineExercises, moveWorkoutElement} from '../../actions';
import {dnd_types} from '../../constants/programs';
import {DraggableWorkoutElement} from './workout_element';

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



export const Day = connect(
    state => ({
        drag_element: state.programs.drag_element
    })
)((props) => {
    let {day, week_id, drag_element} = props;
    let [workout, setWorkout] = useState(props.workout)
    let classes = useStyles();
    const moveItem = (old_location, new_location) => {
        let new_workout = [...workout]
        if (old_location.day != new_location.day) {
            props.moveItem(old_location, new_location)
        } else {
            new_workout.splice(old_location.workout_element_index, 1)
            new_workout.splice(new_location.workout_element_index, 0, drag_element)
            setWorkout(new_workout)
        }

    }

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
                            <DraggableWorkoutElement id={workout_element[0].id} moveItem={moveItem} elem={workout_element} location={location} workout_element={workout_element} classes={classes}/>
                        )
                    })}
                    <MenuItem onClick={() => props.onAddExercise(week_id, day)}>
                        <Typography variant="body2"><AddIcon /> Add Exercise</Typography></MenuItem>
                </List>
            </div>
        </ListItem>
    )
})
