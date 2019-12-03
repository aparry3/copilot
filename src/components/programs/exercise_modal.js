import React, {useEffect, useState} from 'react';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import update from 'immutability-helper';
import {Modal, Paper, MenuItem, InputLabel, Input, Select} from '@material-ui/core';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {setFilter} from '../../actions'
import {WORKOUT_SCHEMES, DETAILS} from '../../constants/workout_elements'
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
        alignItems: 'center',
        flexGrow: 1,
        width: '100%'
    },
    modalContentSection: {
        display: 'flex',
        padding: '5px 30px',
        width: '100%',
        minHeight: '60px',
        flexDirection: 'row'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    formGroup: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%'
    },
    detailGroup: {
        width: '100%',
        padding: '5px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    detailLabel: {
        width: '30%',
        minWidth: '30%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        fontSize: '14px',
        textAlign: 'center'
    },
    editDetailContainer: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '5px'
    },
    detailInput: {
        width: '30px',
        border: 'none',
        outline: 'none',
        borderRadius: '5px',
        textAlign: 'center',
        background: theme.palette.background.light
    },
    detailsContainer: {
        width: '100%',
        padding: '5px'
    },
    formLabelContainer: {
        // padding: '5px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '12px',
        opacity: 0.5
    },
    formLabel: {
        margin: '0'
    },
    formInput: {
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
        minWidth: '70%',
        background: theme.palette.background.dark,
        opacity: 0.6
    },
    formArea: {
        flexGrow: 1,
        background: theme.palette.background.main
    },
    detailAddContainer: {
        display: 'flex',
        cursor: 'pointer',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px',
        borderRadius: '5px',
        '&:hover': {
            background: theme.palette.background.light
        }
    },
    detailInputContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    detailUnit: {
        cursor: 'pointer'
    },
    removeDetailContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0,
        cursor: 'pointer',
        '&:hover': {
            opacity: .5
        }
    },
    removeDetail: {
        height: '20px',
        width: '20px'
    },
    modalBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '20px'
    }
});

let styled = withStyles(styles)
let useStyles = makeStyles(styles)

function findIndexById(id, exercises) {
    let vals = exercises.map(i => i._id)
    return vals.indexOf(id)
}

function FormGroup(props) {
    let classes = useStyles()
    let {name} = props

    return (
        <div className={classes.formGroup}>
            <div className={classes.formLabelContainer}><span>{props.label}</span></div>
            <div className={classes.formInput}>{props.children}</div>
        </div>
    )

}
const VerticalLine = () => (<div style={{
    height: '80%',
    width: 0,
    border: '1px solid black'
}}/>)

const Details = (props) => {
    let classes = useStyles()
    let [details, setDetails] = useState([...Object.keys(DETAILS)])
    let [focus, setFocus] = useState(false)
    useEffect(() => {
        setDetails([...Object.keys(DETAILS)].filter(k => !Object.keys(props.details).includes(k)))
    }, [Object.keys(props.details).length])
    function renderDetail(detail, units) {
        function removeDetail(detail) {
            let new_details = {}
            Object.keys(props.details).forEach(d => {
                if (d != detail) {
                    new_details[d]= props.details[d]
                }
            })
            props.onChange(new_details)
        }


        return (
            <div className={classes.detailGroup}>
                <div className={classes.detailLabel}><span>{detail}</span></div>
                <div className={classes.detailInputContainer}>
                    <div className={classes.editDetailContainer}>
                        <input className={classes.detailInput} name={`${detail}-value`} value={props.details[detail].value} onChange={changeDetail}/>
                        { !!units && (
                            <div className={classes.detailUnit}>
                                <CustomSelect
                                    id="unit"
                                    no_filter
                                    value={props.details[detail].unit}
                                    name={`${detail}-unit`}
                                    placeholder="Unit..."
                                    onChange={changeDetail}
                                    elements={units}>
                                </CustomSelect>
                            </div>
                        )}
                    </div>
                    <div className={classes.removeDetailContainer} onClick={() => removeDetail(detail)}>
                        <span><ClearIcon className={classes.removeDetail} /></span>
                    </div>
                </div>
            </div>
        )
    }

    function changeDetail(e) {
        let items = e.target.name.split('-')
        let new_details = update(props.details, {
            [items[0]]: {[items[1]]: {$set: e.target.value}}
        })
        props.onChange(new_details)

    }

    function addDetail(e) {
        let detail = e.target.value
        let new_details = {...props.details}
        let new_detail = {value: ''}
        if (!!DETAILS[detail]) {
            new_detail.unit = DETAILS[detail][0]
        }
        new_details[detail] = new_detail
        props.onChange(new_details)
        setFocus(false)
    }

    return (
        <div className={classes.detailsContainer}>
            { Object.keys(props.details).map(detail => (
                renderDetail(detail, DETAILS[detail])
            ))}
            {
                (details.length > 0) && (focus ? (
                    <CustomSelect
                        id="detail"
                        no_filter
                        focus
                        onBlur={() => setFocus(false)}
                        name="detail"
                        placeholder="Select detail..."
                        onChange={addDetail}
                        elements={details}>
                    </CustomSelect>
                ) : (
                    <div className={classes.detailAddContainer} onClick={() => setFocus(true)}><AddIcon /><span> Detail</span></div>
                ))
            }
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
        this.handleChangeDetails = this.handleChangeDetails.bind(this);


    }

    componentWillReceiveProps(next_props) {
        this.setState({
            workout_element: !!next_props.workout_element ? next_props.workout_element : {details: {}},
            is_exercise: !next_props.workout_element ||  !!next_props.workout_element && !!next_props.workout_element.exercise_id,
            edit_workout_element: !!next_props.workout_element
        })
    }
    handleChangeDetails(details) {
        console.log(details)
        this.setState({
            workout_element: update(this.state.workout_element, {
                details: {$set: details}
            })
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
                        <form style={{height: '100%'}} onSubmit={this.handleSubmit}>
                            <div className={classes.modalHeader}>
                                <span>{!!this.state.edit_workout_element ? 'Edit' : 'Add'} {this.state.is_exercise ? 'Exercise' : 'Superset'}</span>
                            </div>
                            <div className={classes.modalBody}>
                                <div className={classes.modalContent}>
                                    {this.state.is_exercise && (
                                        <div className={classes.modalContentSection}>
                                            <FormGroup
                                                className={classes.formControl}
                                                label="Exercise">
                                                    <CustomSelect
                                                        id="exercise_name"
                                                        name="exercise_name"
                                                        placeholder="Select Exercise..."
                                                        onChange={this.handleSelectExercise}
                                                        value={this.state.workout_element.exercise_name}
                                                        elements={this.props.exercises.map(e => e.name)}>
                                                    </CustomSelect>
                                            </FormGroup>
                                        </div>
                                    )}
                                    <div className={classes.modalContentSection}>
                                        <FormGroup
                                            className={classes.formControl}
                                            label="Details">
                                                <Details
                                                    id="details"
                                                    name="details"
                                                    onChange={this.handleChangeDetails}
                                                    details={this.state.workout_element.details}
                                                />
                                        </FormGroup>
                                        <FormGroup
                                            className={classes.formControl}
                                            label="Notes">
                                                <textarea
                                                    className={classes.textareaInput}
                                                    rows='5'
                                                    id="workout_element-notes"
                                                    name='notes'
                                                    onChange={this.handleChange}
                                                    value={this.state.workout_element.notes} />
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className={classes.modalFooter}>
                                    <ClearIcon />
                                </div>
                            </div>
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
