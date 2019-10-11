import update from 'immutability-helper';
import React, {useRef, useState, useEffect} from 'react';
import {useDrop, useDrag} from 'react-dnd';
import {connect} from 'react-redux'
import {Grid, MenuItem, Button, List, ListItem, Typography, Divider, Card, CardActions, CardActionArea, CardContent} from '@material-ui/core'
import {makeStyles, withStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add'
import {combineExercises, moveWorkoutElement, setDragElement} from '../../actions';
import {dnd_types} from '../../constants/programs';
import {WorkoutElement} from './workout_element';


const styles = {
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
};

let styled = withStyles(theme => styles)
let useStyles = makeStyles(theme => styles)


function Workout(props) {
    let {classes, week_id, day} = props
    let [{isOver}, drop] = useDrop({
        accept: [dnd_types.SUPERSET, dnd_types.EXERCISE],
        hover(item, monitor) {
            function sameDay(location, old_location) {
                return location.day == old_location.day && location.week == old_location.week
            }
            if (monitor.isOver({shallow: true})) {
                const drag_location = item.location
                if (!sameDay({week, day}, drag_location)) {
                    let new_location = props.moveItem(
                        {week, day, workout_element_index:props.workout.length},
                        drag_location,
                        item.moveCallback
                    )
                    item.location = new_location
                    item.moveCallback = props.removeItem
                }
            }
        },
        collect: monitor => ({
            isOver: !!monitor.isOver({shallow:true})
        })
    })
    return (
        <ListItem className={classes.day} >
           <div className={classes.dayDropArea} >
               <Typography variant="h6">{day}</Typography>
               <List className={classes.dayList}>
                   {props.workout.map((workout_element, workout_element_index) => {
                       let location = {
                           week_id,
                           day,
                           workout_element_index
                       }
                       return (
                           <WorkoutElement
                                locationCallback={props.removeItem}
                                moveItem={props.moveItem}
                                elem={workout_element}
                                location={location}
                                workout_element={workout_element}
                                classes={classes} />
                       )
                   })}
                   <MenuItem ref={drop} onClick={() => props.onAddExercise(week_id, day)}>
                       <Typography variant="body2"><AddIcon /> Add Exercise</Typography></MenuItem>
               </List>
           </div>
       </ListItem>
    )

}


class DayView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            workout: !!props.workout && !!props.workout.workout_elements ? props.workout.workout_elements : []
        }
        this.moveItem = this.moveItem.bind(this)
        this.removeItem = this.removeItem.bind(this)
    }

    componentWillReceiveProps(next_props) {
        this.setState({
            workout: !!next_props.workout && !!next_props.workout.workout_elements ? next_props.workout.workout_elements : []
        })
    }

    moveItem(new_location, old_location, removeOldItem, merge = false) {
        let {workout_element_index, superset_index} = new_location
        let return_location = new_location
        let item = removeOldItem(old_location)
        if (new_location.superset_index != undefined && !old_location.superset_index &&
            old_location.workout_element_index < new_location.workout_element_index) {
            workout_element_index = workout_element_index - 1
            return_location.workout_element_index = workout_element_index
        }
        let old_item = this.state.workout[workout_element_index]
        if (superset_index != undefined) {
            old_item = update(old_item, {
                exercises: {$splice: [[superset_index, 0, item]]}
            })
            if (old_item.exercises.length == 1) {
                old_item = old_item[0]
            }
        }
        let insert_elements = superset_index != undefined ? [old_item] : merge ? [{exercises:[old_item, item]}] : !!old_item ? [item, old_item] : [item]
        let new_workout = update(this.state.workout, {
            $splice: [[workout_element_index, 1].concat(insert_elements)]
        })
        this.setState({
            workout: new_workout
        })
        return return_location
    }

    removeItem(from_location) {
        const {superset_index, workout_element_index} = from_location
        let item = this.state.workout[workout_element_index]
        let return_item = item
        let superset = []
        if (superset_index != undefined) {
            return_item = item.exercises[superset_index]
            superset = update(item, {
                exercises: {$splice: [[superset_index, 1]]}
            })
            superset = !!superset.length ? [superset] : superset
        }
        let new_workout = update(this.state.workout, {
            $splice: [[workout_element_index, 1].concat(superset)]
        })
        this.setState({
            workout: new_workout
        })
        return return_item
    }
    render() {
        let {classes, week_id, day} = this.props
        return <Workout workout={this.state.workout} moveItem={this.moveItem} removeItem={this.removeItem} classes={classes} week_id={week_id} day={day}/>
    }
}

export const Day = styled(DayView)
