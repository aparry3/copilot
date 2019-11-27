import React from 'react';
import update from 'immutability-helper';
import {Modal, Paper, MenuItem, InputLabel, Input, Select} from '@material-ui/core';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {setFilter} from '../../actions'
import {WORKOUT_SCHEMES} from '../../constants/programs'
import {CustomSelect} from '../util'
let top, left = [50, 50]

const styles = theme => ({

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
        padding: '5px 30px',
        width: '100%',
        minHeight: '60px',
        flexDirection: 'column',
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
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    detailLabelContainer: {
        // padding: '5px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '12px',
        opacity: 0.5
    },
    detailLabel: {
        margin: '0'
    },
    detailInput: {
        padding: '5px',
        width: '100%',
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
        textAlign: 'center',
        width: '50px',
        '&:hover': {
            background: theme.palette.background.dark,
            opacity: 0.3
        },
        '&:focus': {
            outline: 'none',
            background: theme.palette.background.light,
            '&:hover': {
                opacity: 1
            }
        }
    },
    textareaInput: {
        outline: 'none',
        padding: '10px',
        borderRadius: '10px',
        border: 'none',
        color: theme.text.primary,
        background: theme.palette.background.mediumDark,
        '&:hover': {
            background: theme.palette.background.dark,
            opacity: 0.3
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
    },
    addExerciseOverlay: {
        zIndex: 100,
        position: 'fixed',
        display: 'flex',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    nonFormArea: {
        width: '60%',
        background: theme.palette.background.dark,
        opacity: 0.6
    },
    formArea: {
        flexGrow: 1,
        background: theme.palette.background.main
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
            <div className={classes.detailLabelContainer}><span>{props.label}</span></div>
            <div className={classes.detailInput}>{props.children}</div>
        </div>
    )

}

class WorkoutElementModalView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workout_element: !!props.workout_element ? props.workout_element : {details: {}},
            is_exercise: !props.workout_element || !!props.workout_element && !!props.workout_element.exercise_id,
            edit_workout_element: !!props.workout_element
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSelectExercise = this.handleSelectExercise.bind(this);


    }

    componentWillReceiveProps(next_props) {
        this.setState({
            workout_element: !!next_props.workout_element ? next_props.workout_element : {details: {}},
            is_exercise: !next_props.workout_element ||  !!next_props.workout_element && !!next_props.workout_element.exercise_id,
            edit_workout_element: !!next_props.workout_element
        })
    }

    handleSelectExercise(e) {
        let exercise_name = e.target.value
        this.setState({
            workout_element: update(this.state.workout_element, {
                exercise_name: {$set: exercise_name},
                exercise_id: {$set: this.props.exercises.find(e => e.name == exercise_name)}
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
            <>
            {this.props.open && (
                <div className={classes.addExerciseOverlay}>
                    <div className={classes.nonFormArea} onClick={this.handleClose}></div>
                    <div className={classes.formArea}>
                        <form onSubmit={this.handleSubmit}>
                            <div className={classes.modalHeader}>
                                <span>{!!this.state.edit_workout_element ? 'Edit' : 'Add'} {this.state.is_exercise ? 'Exercise' : 'Superset'}</span>
                            </div>
                            <div className={classes.modalContent}>
                                {this.state.is_exercise && (
                                    <div className={classes.modalContentSection}>
                                        <DetailGroup
                                            className={classes.formControl}
                                            label="Exercise">
                                                <CustomSelect
                                                    id="exercise_name"
                                                    name="exercise_name"
                                                    placeholder="Selet Exercise..."
                                                    onChange={this.handleSelectExercise}
                                                    value={this.state.workout_element.exercise_name}
                                                    elements={this.props.exercises.map(e => e.name)}>
                                                </CustomSelect>
                                        </DetailGroup>
                                    </div>
                                )}
                                <hr className={classes.hr}/>
                            </div>
                            <button className="btn btn-default" onClick={this.handleCancel} >Cancel</button>
                        </form>
                    </div>
                </div>
            )}
            </>
        )
    }
}
// <div className={classes.modalContentSection}>
//     <DetailGroup
//         className={classes.formControl}
//         label="Scheme"
//         input_component={
//             <Select
//                 id="workout_element-details-scheme"
//                 name='scheme'
//                 onChange={this.handleChange}
//                 value={this.state.workout_element.details.scheme}>
//                 {WORKOUT_SCHEMES.map((scheme, index)=> {
//                     return <MenuItem key={scheme} value={scheme}>{scheme}</MenuItem>
//                 })}
//             </Select>
//         }
//         name="scheme"
//         />
// </div>
// <hr className={classes.hr}/>
// <div className={classes.modalContentSection}>
//     <DetailGroup
//         className={classes.formControl}
//         label="Sets"
//         input_component={
//             <input
//                 className={classes.textInput}
//                 id="workout_element-details-sets"
//                 name='sets'
//                 onChange={this.handleChange}
//                 value={this.state.workout_element.details.sets} />
//
//         }
//         name="sets"
//         />
//     <DetailGroup
//         className={classes.formControl}
//         label="Repetitions"
//         input_component={
//             <input
//                 className={classes.textInput}
//                 id="workout_element-details-repetitions"
//                 name='repetitions'
//                 onChange={this.handleChange}
//                 value={this.state.workout_element.details.repetitions} />
//
//         }
//         name="repetitions"
//         />
//     <DetailGroup
//         className={classes.formControl}
//         label="Duration"
//         input_component={
//             <input
//                 className={classes.textInput}
//                 id="workout_element-details-duration"
//                 name='duration'
//                 onChange={this.handleChange}
//                 value={this.state.workout_element.details.duration} />
//
//         }
//         name="duration"
//         />
//
// </div>
// <hr className={classes.hr}/>
// <div className={classes.modalContentSection}>
//     <DetailGroup
//         className={classes.formControl}
//         label="Notes"
//         name="notes"
//         input_component={
//             <textarea
//                 className={classes.textareaInput}
//                 rows='5'
//                 id="workout_element-notes"
//                 name='notes'
//                 onChange={this.handleChange}
//                 value={this.state.workout_element.notes} />
//
//         }
//         />
// </div>


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
