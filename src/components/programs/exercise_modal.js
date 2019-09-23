import React from 'react';
import {Modal, Paper, MenuItem, FormControl, InputLabel, Input, Select} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {setFilter} from '../../actions'
import {WORKOUT_SCHEMES} from '../../constants/programs'
let top, left = [50, 50]

let styled = withStyles(theme => ({
    paper: {
        top: `50px`,
        left: `50px`,
        position: 'absolute',
        width: 300

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    }
}));
function find_index(item, list) {
    let key = Object.keys(item)[0];
    let vals = list.map(i => i[key])
    return vals.indexOf(item[key])
}
class ExerciseModalView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exercise_index: props.exercise_definition ? find_index(props.exercise_definition, props.exercises) : -1,
            details: {
                scheme: 'AMRAP'
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);


    }
    handleChange(e) {
        let subobject = e.target.name.split('-')
        if (subobject.length == 1) {
            this.setState({
                [subobject[0]]: e.target.value
            })
        }
        else {
            this.setState({
                [subobject[0]]: {
                    ...this.state[subobject[0]],
                    [subobject[1]]: e.target.value
                }
            })
        }

    }
    handleClose() {
        this.setState({
            exercise_index: -1
        });
        this.props.onClose();
    }
    handleSubmit(e) {
        e.preventDefault();
        let exercise = this.props.exercises[this.state.exercise_index];
        this.setState({
            exercise_index: -1
        });
        this.props.onSubmit({exercise_name: exercise.name, exercise_id: exercise._id, details: this.state.details})
    }
    render() {
        let classes = this.props.classes
        return (
            <Modal  open={this.props.open} onClose={this.handleClose}>
                <Paper className={classes.paper}>
                <form onSubmit={this.handleSubmit}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="exercise_index">Exercise</InputLabel>
                    <Select id="exercise_index"name='exercise_index' onChange={this.handleChange} value={this.state.exercise_index}>
                        {this.props.exercises.map((exercise, index)=> {
                            return <MenuItem key={exercise._id} value={index}>{exercise.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="details-scheme">Scheme</InputLabel>
                    <Select id="details-scheme"name='details-scheme' onChange={this.handleChange} value={this.state.details.scheme}>
                        {WORKOUT_SCHEMES.map((scheme, index)=> {
                            return <MenuItem key={scheme} value={scheme}>{scheme}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="details-sets">Sets</InputLabel>
                    <Input id="details-sets"name='details-sets' onChange={this.handleChange} value={this.state.details.sets} />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="details-repetitions">Repetitions</InputLabel>
                    <Input id="details-repetitions"name='details-repetitions' onChange={this.handleChange} value={this.state.details.repetitions} />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="details-duration">Duration</InputLabel>
                    <Input id="details-duration"name='details-duration' onChange={this.handleChange} value={this.state.details.duration} />
                </FormControl>
                <div>
                    <input className="btn btn-primary" type="submit" value="submit" />
                </div>

                </form>
                </Paper>
            </Modal>
        )
    }
}

export const ExerciseModal = connect(
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
)(styled(ExerciseModalView));
