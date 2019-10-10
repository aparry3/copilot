import React, {useEffect, useState, useCallback} from "react";
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
    useEffect(() => {
        console.log(props.program)
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
        <Grid container>
            <DndProvider backend={HTML5Backend} >
                {props.program.weeks.map((week_id, index) => {
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

export const InteractiveProgram = (props) => {
    let {program, moveItem, classes, handleAddExercise, handleAddWeek} = props;
}



export const Program = connect(
        (state, ownProps) => {
            function findProgram(programs, id) {
                console.log(programs)
                console.log(id)

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
                addWeek: (user_id, program_id) => dispatch(addWeekAndPersist(user_id, program_id)),
                getProgram: (user_id, program_id) => dispatch(getProgram(user_id, program_id)),
                editWeek: (user_id, program_id, week_id, week) => dispatch(editWeekAndPersist(user_id, program_id, week_id, week)),
                moveWorkoutElement: (old_location, new_location) => dispatch(moveWorkoutElement(old_location, new_location))

            }
        }
)(styled(ProgramView))
