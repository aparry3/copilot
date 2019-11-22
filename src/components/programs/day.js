import clsx from 'clsx'
import update from 'immutability-helper';
import React, {useRef, useState, useEffect} from 'react';
import {useDrop, useDrag} from 'react-dnd';
import {connect} from 'react-redux'
import {Grid, MenuItem, Button, List, ListItem, Typography, Divider, Card, CardActions, CardActionArea, CardContent} from '@material-ui/core'
import {makeStyles, withStyles} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add'
import FilterIcon from '@material-ui/icons/Filter'
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
    dayContainer: {
        height:'100%',
        width: '95%',
        borderRadius: '10px',
        background: theme.palette.background.mediumDark,
        overflow: 'auto',
        padding: '5%',
        display: 'flex',
        flexDirection: 'column'
    },
    dayDropArea: {
        flexGrow: 1
    },
    dayHeader: {
        marginBottom: '10px'
    },
    addExerciseContainer: {
        borderRadius: '20px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addExercise: {
        cursor: 'pointer',
        background: theme.palette.background.dark,
        opacity: 0.1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        borderRadius: '20px',
        height: '100%',
        '&:hover': {
            opacity: 0.5
        }
    },
    addButton: {
        width: '50%',
        height: '100%',
        opacity: 0.1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        '&:hover': {
            opacity: 1
        }

    },
    paste: {
        borderRadius: '0 20px 20px 0',
        '&:hover': {
            background: theme.accents.secondaryHover
        }
    },
    addNewExercise: {
        borderRadius: '20px 0px 0px 20px',
        '&:hover': {
            background: theme.accents.primaryHover
        }
    }
});

let styled = withStyles(styles)
let useStyles = makeStyles(styles)


const Workout = connect(
    state => ({
        clipboard: state.programs.clipboard
    })
)((props) => {
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
            if (item.original_location.week_id == week_id) {
                props.save([item.original_location.day, item.originalState()])
            } else {
                props.save()
                item.saveCallback()
            }
        },
        collect: monitor => ({
            isOver: !!monitor.isOver({shallow:true})
        })
    })


    return (
        <div className={classes.day} >
            <div className={classes.dayContainer}>
                <div className={classes.dayHeader}>
                    <Typography variant="h6">{day}</Typography>
                </div>
                <div className={classes.dayList}>
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
                            getWorkoutState={props.getWorkoutState}
                            removeItem={props.removeItem}
                            moveItem={props.moveItem}
                            location={location}
                            workout_element={workout_element} />
                        )
                    })}
                </div>

                <div ref={drop} className={classes.dayDropArea}>
                    <AddExercise pasteExercise={props.pasteExercise} addExercise={props.addExercise} />
                </div>
            </div>
        </div>
    )

})

const AddExercise = styled(connect(state => ({clipboard: state.programs.clipboard}))((props) => {
    let [mouse_over, setMouseOver] = useState(false)
    let {classes} = props
    return (
        <div className={classes.addExerciseContainer} onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
            {(mouse_over && !!props.clipboard) ? (
                <>
                    <div className={clsx(classes.addButton, classes.addNewExercise)} onClick={() => props.addExercise()}>
                        <AddIcon />
                    </div>
                    <div className={clsx(classes.addButton, classes.paste)} onClick={(e) => {e.preventDefault(); e.stopPropagation(); props.pasteExercise(props.clipboard);}}>
                        <FilterIcon />
                    </div>
                </>
            ) : (
                <div className={classes.addExercise} onClick={() => props.addExercise()}>
                    <Typography variant="body2"><AddIcon /> Add Exercise</Typography>
                </div>
            )}
        </div>
    )
}))

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
        this.getWorkoutState = this.getWorkoutState.bind(this)

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
        let insert_elements = superset_index != undefined ? [old_item] : merge ? [{exercises:[old_item, item], details: {}}] : !!old_item ? [item, old_item] : [item]
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
                if (this.state.edit_location.superset_index != undefined) {
                    let new_workout_element = update(this.state.workout[this.state.edit_location.workout_element_index], {
                        exercises: {
                            $splice: [[this.state.edit_location.superset_index, 1, workout_element]]
                        }
                    })
                    updated_workout_elements[2] = new_workout_element
                }

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
            this.save([day, new_workout])
        }
    }

    toggleModal(edit_location=null) {
        let new_state = {
            modal_is_open: !this.state.modal_is_open,
            workout_element: null
        }
        if (!!edit_location) {
            let workout_element = this.state.workout[edit_location.workout_element_index]
            if (edit_location.superset_index != undefined) {
                workout_element = workout_element.exercises[edit_location.superset_index]
                console.log(workout_element)
            }
            new_state.workout_element = workout_element
            new_state.edit_location = edit_location
        }
        this.setState(new_state)
    }

    save(workout=null) {
        let updates = !!workout ? [[this.props.day, this.state.workout], workout] : [[this.props.day, this.state.workout]]
        this.props.save(updates)
    }

    getWorkoutState() {
        return this.state.workout
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
                    pasteExercise={this.handleModalSubmit}
                    moveItem={this.moveItem}
                    addExercise={this.toggleModal}
                    removeItem={this.removeItem}
                    getWorkoutState={this.getWorkoutState}
                    classes={classes}
                    week_id={week_id}
                    day={day}/>
            </>
        )
    }
}

export const Day = styled(DayView)
