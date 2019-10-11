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
import {Week} from './week'

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


function ProgramView(props) {
    let [modalIsOpen, setModelIsOpen] = useState(false);
    let [week_id, setWeek] = useState(-1);
    let [day, setDay] = useState(-1)
    let [program, setProgram] = useState(props.program)
    useEffect(() => {
        setProgram(props.program)
    })

    async function handleAddWeek() {
        let week = await props.addWeek(props.program._id)

        setProgram(update(program, {
            weeks: {
                $splice: [[program.weeks.length, 0, week._id]]
            }
        }))
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
        <Grid container>
            <DndProvider backend={HTML5Backend} >
                {program.weeks.map((week_id, index) => {
                    return (
                        <div key={`${index}`}>
                            <Week week_id={week_id} classes={classes} />
                            <Divider variant="middle"/>
                        </div>
                    )
                })}
                <button className='btn btn-success' onClick={handleAddWeek}>Add Week</button>
            </DndProvider>

        </Grid>

    );

}



export const Program = connect(
        (state, ownProps) => {
            function findProgram(programs, id) {

                for (var prog of programs) {
                    if (prog._id == id) {
                        return prog
                    }
                }
                return null
            }
            return {
                program: findProgram(state.programs.all_programs, ownProps.match.params.program_id),
                user: state.auth.user
            }
        },
        (dispatch) => {
            return {
                addWeek: (program_id) => dispatch(addWeekAndPersist(program_id)),
                getProgram: (program_id) => dispatch(getProgram(program_id)),
                editWeek: (program_id, week_id, week) => dispatch(editWeekAndPersist(program_id, week_id, week)),
                moveWorkoutElement: (old_location, new_location) => dispatch(moveWorkoutElement(old_location, new_location))

            }
        }
)(styled(ProgramView))
