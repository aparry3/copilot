import React from 'react';
import update from 'immutability-helper';
import {Modal, Paper, MenuItem, FormControl, InputLabel, Input, Select} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {setFilter} from '../../actions'
import {WORKOUT_SCHEMES} from '../../constants/programs'
let top, left = [50, 50]

let styled = withStyles(theme => ({
    paper: {
        top: `20vh`,
        left: `35vw`,
        position: 'absolute',
        width: '30vw'

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    }
}));
function findIndexById(id, exercises) {
    let vals = exercises.map(i => i._id)
    return vals.indexOf(id)
}
class WorkoutElementModalView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workout_element: !!props.workout_element ? props.workout_element : {details: {scheme: 'AMRAP'}},
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSelectExercise = this.handleSelectExercise.bind(this);


    }

    componentWillReceiveProps(next_props) {
        this.setState({
            workout_element: !!next_props.workout_element ? next_props.workout_element : {details: {scheme: 'AMRAP'}}
        })
    }

    handleSelectExercise(e) {
        let exercise = this.props.exercises[e.target.value]
        this.setState({
            workout_element: update(this.state.workout_element, {
                exercise_name: {$set: exercise.name},
                exercise_id: {$set: exercise._id}
            })
        })
    }

    handleChange(e) {
        this.setState({
            workout_element: update(this.state.workout_element, {
                details: {
                    [e.target.name]: {$set: e.target.value}
                }
            })
        })

    }

    handleClose() {
        this.props.onSubmit(this.state.workout_element)
        this.setState({workout_element: {details: {scheme:'AMRAP'}}})
        this.props.onClose();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.handleClose()
    }

    handleCancel() {
        this.setState({
            workout_element: {details: {scheme:'AMRAP'}}
        })
        this.props.onClose();
    }

    render() {
        let classes = this.props.classes
        return (
            <Modal open={this.props.open} onClose={this.handleClose}>
                <Paper className={classes.paper}>
                <form onSubmit={this.handleSubmit}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="exercise_index">Exercise</InputLabel>
                    <Select
                        id="exercise_index"
                        name='exercise_index'
                        onChange={this.handleSelectExercise}
                        value={findIndexById(this.state.workout_element.exercise_id, this.props.exercises)}>
                        {this.props.exercises.map((exercise, index)=> {
                            return <MenuItem key={exercise._id} value={index}>{exercise.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="workout_element-details-scheme">Scheme</InputLabel>
                    <Select
                        id="workout_element-details-scheme"
                        name='scheme'
                        onChange={this.handleChange}
                        value={this.state.workout_element.details.scheme}>
                        {WORKOUT_SCHEMES.map((scheme, index)=> {
                            return <MenuItem key={scheme} value={scheme}>{scheme}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="workout_element-details-sets">Sets</InputLabel>
                    <Input
                        id="workout_element-details-sets"
                        name='sets'
                        onChange={this.handleChange}
                        value={this.state.workout_element.details.sets} />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="workout_element-details-repetitions">Repetitions</InputLabel>
                    <Input
                        id="workout_element-details-repetitions"
                        name='repetitions'
                        onChange={this.handleChange}
                        value={this.state.workout_element.details.repetitions} />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="workout_element-details-duration">Duration</InputLabel>
                    <Input
                        id="workout_element-details-duration"
                        name='duration' 
                        onChange={this.handleChange} 
                        value={this.state.workout_element.details.duration} />
                </FormControl>
                </form>
                <button className="btn btn-default" onClick={this.handleCancel} >Cancel</button>
                </Paper>
            </Modal>
        )
    }
}

export const WorkoutElementModal = connect(
    (state) => {
        return {
            exercises: state.exercises.items.filter(item => {
                return item.name.includes(state.exercises.filter)
            })
        }
    },
    (dispatch) => {
        return {
            setFilter: (text) => dispatch(setFilter(text))
        }
    }
)(styled(WorkoutElementModalView));
