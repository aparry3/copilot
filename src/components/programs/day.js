import update from 'immutability-helper';
import React, {useRef, useState, useEffect} from 'react';
import {useDrop, useDrag} from 'react-dnd';
import {connect} from 'react-redux'
import {Grid, MenuItem, Button, List, ListItem, Typography, Divider, Card, CardActions, CardActionArea, CardContent} from '@material-ui/core'
import {makeStyles, withStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add'
import {persistDay, moveWorkoutElement, setDragElement} from '../../actions';
import {dnd_types} from '../../constants/programs';
import {WorkoutElement} from './workout_element';
import {WorkoutElementModal} from './exercise_modal';



const styles = theme => ({
    day: {
        flexShrink: 0,
        width:'20%',
        flexDirection: 'column',
        paddingLeft: '5px',
        paddingRight: '5px',
        textAlign: 'center'
    },
    dayList: {
        overflow: 'auto',
        alignItems: 'center'
    },
    dayDropArea: {
        height:'100%',
        width: '95%',
        borderRadius: '10px',
        background: theme.palette.background.mediumDark
    }
});

let styled = withStyles(styles)
let useStyles = makeStyles(styles)


function Workout(props) {
    let {
        classes,
        week_id,
        day
    } = props
    let [{isOver}, drop] = useDrop({
        accept: [dnd_types.SUPERSET, dnd_types.EXERCISE],
        hover(item, monitor) {
            function sameDay(location, old_location) {
                return location.day == old_location.day && location.week_id == old_location.week_id
            }
            if (monitor.isOver({shallow: true})) {
                const drag_location = item.location
                if (!sameDay({week_id, day}, drag_location)) {
                    let new_location = props.moveItem(
                        {
                            week_id,
                            day,
                            workout_element_index:props.workout.length
                        },
                        drag_location,
                        item.moveCallback
                    )
                    item.location = new_location
                    item.moveCallback = props.removeItem
                }
            }
        },
        drop: (item, monitor) => {
            props.save()
            item.saveCallback()
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
                                key={`${week_id}-${day}-${workout_element.exercise_id}-${workout_element_index}`}
                                editWorkoutElement={props.editWorkoutElement}
                                save={props.save}
                                removeItem={props.removeItem}
                                moveItem={props.moveItem}
                                location={location}
                                workout_element={workout_element} />
                       )
                   })}
                   <MenuItem ref={drop} onClick={() => props.addExercise()}>
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
            workout: !!props.workout && !!props.workout.workout_elements ? props.workout.workout_elements : [],
            modal_is_open: false,
            workout_element: null
        }
        this.moveItem = this.moveItem.bind(this)
        this.save = this.save.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.handleModalSubmit = this.handleModalSubmit.bind(this)

    }

    componentWillReceiveProps(next_props) {
        this.setState({
            workout: !!next_props.workout && !!next_props.workout.workout_elements ? next_props.workout.workout_elements : []
        })
    }

    moveItem(new_location, old_location, removeOldItem, merge = false) {

        let {
            workout_element_index,
            superset_index
        } = new_location
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

    removeItem(from_location, return_workout=false) {
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
        return return_workout ? new_workout : return_item
    }

    handleModalSubmit(workout_element) {
        if (!!workout_element.exercise_id || !!workout_element.exercises) {
            let updated_workout_elements = [this.state.workout.length, 0, workout_element]
            if (!!this.state.edit_location) {
                updated_workout_elements[0] = this.state.edit_location.workout_element_index
                updated_workout_elements[1] = 1
            }
            console.log(updated_workout_elements)
            let new_workout = update(this.state.workout, {
                $splice: [updated_workout_elements]
            })
            this.setState({
                workout: new_workout,
                workout_element: null,
                edit_location: null
            })
            this.props.save(new_workout)
        }
    }

    toggleModal(edit_location=null) {
        let new_state = {
            modal_is_open: !this.state.modal_is_open,
            workout_element: null
        }
        if (!!edit_location) {
            new_state.workout_element = this.state.workout[edit_location.workout_element_index],
            new_state.edit_location = edit_location
        }
        this.setState(new_state)
    }

    save(workout=null) {
        this.props.save(!!workout ? workout : this.state.workout)
    }

    render() {
        let {classes, week_id, day} = this.props
        return (
            <>
                <WorkoutElementModal
                    workout_element={this.state.workout_element}
                    open={this.state.modal_is_open}
                    onSubmit={this.handleModalSubmit}
                    onClose={this.toggleModal} />
                <Workout
                    editWorkoutElement={this.toggleModal}
                    workout={this.state.workout}
                    save={this.save}
                    moveItem={this.moveItem}
                    addExercise={this.toggleModal}
                    removeItem={this.removeItem}
                    classes={classes}
                    week_id={week_id}
                    day={day}/>
            </>
        )
    }
}

export const Day = styled(DayView)
