import React, {useEffect, useState, useCallback} from "react";
import update from 'immutability-helper';
import { connect } from 'react-redux';
import { DndProvider, } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {fade, withStyles} from '@material-ui/core/styles';
import {Grid, Button, List, ListItem, Typography, Card, Divider, CardActions, CardActionArea, CardContent} from '@material-ui/core'
import {SIDEBAR_WIDTH} from '../styles'
import {dnd_types} from '../../constants/programs';
import {getProgram, editWeekAndPersist, addWeekAndPersist, addProgramAndPersist, combineExercises, moveWorkoutElement} from '../../actions';
import {ExerciseModal} from './exercise_modal';
import {Day} from './day'
const styled = withStyles(theme => ({
    programContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-even',
        overflow: 'hidden',
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%'
    },
    week: {
        width: '140%',
        height: '80vh',
        overflow: 'auto'
    },
    programPage: {
        background: '#f6f8f9',

    }

}));

const Week = (props) => {

    let {week_id, week, classes} = props;
    return (
        <Grid item xs={12} className={classes.week}>
            <List className={classes.list} >
            {Object.keys(week).map((day) => {
                return (<Day key={`${week_id}-${day}`} moveItem={props.moveItem} week_id={week_id} day={day} workout={week[day]} classes={classes} onAddExercise={props.onAddExercise}/>)
            })}
            </List>
        </Grid>

    )
}

function ProgramView(props) {
    let [program, setProgram] = useState(null);
    let [modalIsOpen, setModelIsOpen] = useState(false);
    let [week_id, setWeek] = useState(-1);
    let [day, setDay] = useState(-1)
    useEffect(() => {
        const init = async () => {
            let fetched_program = await props.getProgram(props.user._id, props.match.params.program_id)
        }
        if (!props.program) {
            init()
        } else if (!program) {
            setProgram(props.program)
        }
    })
    async function handleAddWeek() {
        props.addWeek(props.user._id, program._id);
    }
    function handleAddExercise(week_id, day) {
        setModelIsOpen(true);
        setWeek(week_id);
        setDay(day)
    }

    function handleModalClose() {
        setModelIsOpen(false);
        setWeek('');
        setDay('')
    }

    function handleSubmit(exercise, index=-1) {
        let new_week = {...program[week_id]};
        new_week[day].push([exercise])
        let new_program = {
            ...program,
            [week_id]: new_week
        }
        props.editWeek(props.user._id, program._id, week_id, new_week)
        handleModalClose();
    }
    let classes = props.classes;
    return (
        <div className={classes.programPage}>
        {!!program ? (
        <DndProvider backend={HTML5Backend} >
            <div className={classes.programContainer}>
                <ExerciseModal onSubmit={handleSubmit} open={modalIsOpen} onClose={handleModalClose}/>
                <InteractiveProgram classes={classes} handleAddExercise={handleAddExercise} handleAddWeek={handleAddWeek} program={program} />
            </div>
        </DndProvider>) : <div>Loading...</div>}
        </div>
    );

}

export const InteractiveProgram = (props) => {
    let [program, setProgram] = useState({...props.program});
    const moveItem = useCallback(
        (old_location, new_location) => {

            let drag_item = program[old_location.week_id][old_location.day][old_location.workout_element_index];
            let new_program = {...program}
            new_program[old_location.week_id][old_location.day].splice(old_location.workout_element_index, 1);
            new_program[new_location.week_id][new_location.day].splice(new_location.workout_element_index, 0, drag_item);

            setProgram(new_program)

        }
    ,[program])
    let {classes, handleAddExercise, handleAddWeek} = props;
    return (
        <Grid container>
            {Object.keys(program).map((week_id) => {
                return (
                    <div key={`${week_id}`}>
                        <Week week={program[week_id]} week_id={week_id} moveItem={moveItem} classes={classes} onAddExercise={props.handleAddExercise}/>
                        <Divider variant="middle"/>
                    </div>
                )
            })}
            <button className='btn btn-success' onClick={handleAddWeek}>Add Week</button>
        </Grid>
    )
}



export const Program = connect(
        (state, ownProps) => {
            function _stripProgramForView(program) {
                if (!program) {
                    return null
                }
                function _getWorkoutElements(workout_elements) {
                    return workout_elements.map(we => {
                        if (!!we.exercises && we.exercises.length) {
                            return we.exercises.map(e => {
                                e['id'] = Math.floor(Math.random() * 10000);
                                return e
                            })
                        }
                        we['id'] = Math.floor(Math.random() * 10000);
                        return [we]
                    })
                }
                let weeks = {}
                program.weeks.forEach(w => {
                    weeks[w._id] = {
                        'monday': _getWorkoutElements(w.days['monday'].workout_elements),
                        'tuesday': _getWorkoutElements(w.days['tuesday'].workout_elements),
                        'wednesday': _getWorkoutElements(w.days['wednesday'].workout_elements),
                        'thursday': _getWorkoutElements(w.days['thursday'].workout_elements),
                        'friday': _getWorkoutElements(w.days['friday'].workout_elements),
                        'saturday': _getWorkoutElements(w.days['saturday'].workout_elements),
                        'sunday': _getWorkoutElements(w.days['sunday'].workout_elements)
                    }
                })
                return weeks
            }
            let program = _stripProgramForView(state.programs.active_program)
            return {
                program: program,
                user: state.auth.user
            }
        },
        (dispatch) => {
            return {
                addWeek: (user_id, program_id) => dispatch(addWeekAndPersist(user_id, program_id)),
                getProgram: (user_id, program_id) => dispatch(getProgram(user_id, program_id)),
                editWeek: (user_id, program_id, week_id, week) => dispatch(editWeekAndPersist(user_id, program_id, week_id, week)),
                moveWorkoutElement: (old_location, new_location) => dispatch(moveWorkoutElement(old_location, new_location))

            }
        }
)(styled(ProgramView))
