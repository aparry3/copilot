import React from 'react';
import update from 'immutability-helper';
import {Modal, Paper, MenuItem, InputLabel, Input, Select} from '@material-ui/core';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {setFilter} from '../../actions'
import {WORKOUT_SCHEMES} from '../../constants/programs'
let top, left = [50, 50]

const styles = theme => ({
    paper: {
        borderRadius: '10px',
        top: `20vh`,
        left: `30vw`,
        position: 'absolute',
        width: '40vw',
        background: theme.palette.background.main,
        color: theme.text.primary

    },
    modalHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '10px 15px',
        borderRadius: '10px 10px 0 0',
        height: '70px',
        width: '100%',
        background: theme.palette.background.mediumDark,
        fontSize: '32px',
        letterSpacing: '2px',
        fontWeight: '150'
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    modalContentSection: {
        display: 'flex',
        padding: '20px',
        width: '100%',
        minHeight: '60px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    detailGroup: {
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    detailLabelContainer: {
        width: '40%',
        margin: '0',
        padding: '5px',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    detailLabel: {
        margin: '0'
    },
    detailInput: {
        padding: '5px',
        width: '60%',
        display: 'flex',
        justifyContent: 'flex-start'

    },
    textInput: {
        borderRadius: '10px',
        height: '30px',
        border: 'none',
        padding: '10px',
        color: theme.text.primary,
        background: theme.palette.background.mediumDark,
        resize: 'none',
        textAlign: 'center',
        width: '50px',
        '&:hover': {
            background: theme.palette.background.dark
        },
        '&:focus': {
            outline: 'none',
            background: theme.palette.background.light
        }

    },
    hr: {
        width: '80%',
        background: theme.palette.background.dark,
        opacity: 0.1,
        margin: '0',
        border: 0,
        borderTop: '2px solid rgba(0,0,0,.1)'
    }
});

let styled = withStyles(styles)
let useStyles = makeStyles(styles)

function findIndexById(id, exercises) {
    let vals = exercises.map(i => i._id)
    return vals.indexOf(id)
}

function DetailGroup(props) {
    let classes = useStyles()
    let {name} = props

    return (
        <div className={classes.detailGroup}>
            <div className={classes.detailLabelContainer}><label className={classes.detailLabel} htmlFor={name}>{props.label}</label></div>
            <div className={classes.detailInput}>{props.input_component}</div>
        </div>
    )

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
        if (e.target.name == 'notes') {
            this.setState({
                workout_element: update(this.state.workout_element, {
                        [e.target.name]: {$set: e.target.value}
                })
            })
        } else {
            this.setState({
                workout_element: update(this.state.workout_element, {
                    details: {
                        [e.target.name]: {$set: e.target.value}
                    }
                })
            })
        }


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
            <form onSubmit={this.handleSubmit}>
                <Paper className={classes.paper}>
                <div className={classes.modalHeader}>
                    <span>{!!this.state.workout_element.exercise_id ? 'Edit' : 'Add'} Exercise</span>
                </div>
                <div className={classes.modalContent}>
                    <div className={classes.modalContentSection}>
                        <DetailGroup
                            className={classes.formControl}
                            name="exercise_index"
                            label="Exercise"
                            input_component={(
                                <Select
                                    id="exercise_index"
                                    name="exercise_index"
                                    onChange={this.handleSelectExercise}
                                    value={findIndexById(this.state.workout_element.exercise_id, this.props.exercises)}>
                                    {this.props.exercises.map((exercise, index)=> {
                                        return <MenuItem key={exercise._id} value={index}>{exercise.name}</MenuItem>
                                    })}
                                </Select>
                            )}
                            />
                    </div>
                    <hr className={classes.hr}/>
                    <div className={classes.modalContentSection}>
                        <DetailGroup
                            className={classes.formControl}
                            label="Scheme"
                            input_component={
                                <Select
                                    id="workout_element-details-scheme"
                                    name='scheme'
                                    onChange={this.handleChange}
                                    value={this.state.workout_element.details.scheme}>
                                    {WORKOUT_SCHEMES.map((scheme, index)=> {
                                        return <MenuItem key={scheme} value={scheme}>{scheme}</MenuItem>
                                    })}
                                </Select>
                            }
                            name="scheme"
                            />
                    </div>
                    <hr className={classes.hr}/>
                    <div className={classes.modalContentSection}>
                        <DetailGroup
                            className={classes.formControl}
                            label="Sets"
                            input_component={
                                <input
                                    className={classes.textInput}
                                    id="workout_element-details-sets"
                                    name='sets'
                                    onChange={this.handleChange}
                                    value={this.state.workout_element.details.sets} />

                            }
                            name="sets"
                            />
                        <DetailGroup
                            className={classes.formControl}
                            label="Repetitions"
                            input_component={
                                <input
                                    className={classes.textInput}
                                    id="workout_element-details-repetitions"
                                    name='repetitions'
                                    onChange={this.handleChange}
                                    value={this.state.workout_element.details.repetitions} />

                            }
                            name="repetitions"
                            />
                        <DetailGroup
                            className={classes.formControl}
                            label="Duration"
                            input_component={
                                <input
                                    className={classes.textInput}
                                    id="workout_element-details-duration"
                                    name='duration'
                                    onChange={this.handleChange}
                                    value={this.state.workout_element.details.duration} />

                            }
                            name="duration"
                            />

                    </div>
                    <hr className={classes.hr}/>
                    <div className={classes.modalContentSection}>
                        <DetailGroup
                            className={classes.formControl}
                            label="Notes"
                            name="notes"
                            input_component={
                                <textarea
                                    rows='5'
                                    id="workout_element-notes"
                                    name='notes'
                                    onChange={this.handleChange}
                                    value={this.state.workout_element.notes} />

                            }
                            />
                    </div>

                </div>
                <button className="btn btn-default" onClick={this.handleCancel} >Cancel</button>
                </Paper>
                </form>
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
