import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import {fade, withStyles} from '@material-ui/core/styles';
import {Grid, List, ListItem, Typography, Card} from '@material-ui/core'
import {SIDEBAR_WIDTH} from '../styles'
import {getProgram, editWeek, addWeekAndPersist, addProgramAndPersist} from '../../actions';
import {ExerciseModal} from './exercise_modal';

const styled = withStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-even',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%'
    },
    week: {
        height: '80vh'
    },
    day: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-start'
    }

}));

const Week = (props) => {
    let {week_id, week, classes} = props;
    return (
        <Grid key={week_id} item xs={12} className={classes.week}>
            <List className={classes.list} >
            {Object.keys(week.days).map((day, dindex) => {
                return (<Day week_id={week_id} workout={week.days[day]} day={day} classes={classes} onAddExercise={props.onAddExercise}/>)
            })}
            </List>
        </Grid>

    )
}

const Day = (props) => {
    let {day, week_id, workout, classes} = props;
    function renderExercise(workout_element) {
        return workout_element.exercise_id ? (
            <Card>{workout_element.exercise_name}</Card>
        ) : (
            <Card>
                <List>
                    {workout_element.exercises.map((ex, index)=> {
                        return (<ListItem>{renderExercise(ex)}</ListItem>)
                    })}
                </List>
            </Card>
        )
    }
    return (
        <ListItem className={classes.day} key={`${week_id}-${day}`}>
            <Typography variant="h6">{day}</Typography>
            <List>
                {workout.workout_elements && workout.workout_elements.map((workout_element) => {
                    return (
                        renderExercise(workout_element)
                    )
                })}
                <ListItem><button className='btn btn-success' onClick={() => props.onAddExercise(week_id, day)}>Add Exercise</button></ListItem>
            </List>
        </ListItem>
    )
}
function ProgramView(props) {
    let [update, setUpdate] = useState(true)
    let [modalIsOpen, setModelIsOpen] = useState(false);
    let [week_id, setWeek] = useState(-1);
    let [day, setDay] = useState(-1)
    let [program, setProgram] = useState(null)

    useEffect(() => {
        const init = async () => {
            let full_program = await getProgram(props.user._id, props.match.params.program_id)
            setProgram(full_program);
        }
        if (update) {
            init()
            setUpdate(false)
        }
    }, [])
    async function handleAddWeek() {
        setProgram(await props.addWeek(props.user._id, program._id));
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
        let new_week = {...program.weeks[program.weeks.map(week => week._id).indexOf(week_id)]};
        new_week.days[day].workout_elements.push(exercise)
        let new_program = {
            ...program,
            weeks: program.weeks.map(week => {
                return week._id == new_week._id ? new_week : week;
            })
        }
        editWeek(props.user._id, program._id, week_id, new_week)
        setProgram(new_program);
        handleModalClose();
    }

    let classes = props.classes;



    return (
        <div>
        {!!program ? (
        <div className={classes.root}>
            <ExerciseModal onSubmit={handleSubmit} open={modalIsOpen} onClose={handleModalClose}/>
            <Grid container>
                {program.weeks.map((week, windex) => {
                    return (
                        <Week week_id={week._id} week={week} classes={classes} onAddExercise={handleAddExercise}/>
                    )
                })}
                <button className='btn btn-success' onClick={handleAddWeek}>Add Week</button>
            </Grid>
        </div> ) : <div>Loading...</div>}
        </div>
    );

}



export const Program = connect(
        (state, ownProps) => {

            function getProgramById(id) {
                let prog = state.programs.all_programs[state.programs.all_programs.map(p => p._id).indexOf(id)];
                return prog
            }
            return {
                user: state.auth.user
            }
        },
        (dispatch) => {
            return {
                addWeek: (user_id, program_id) => dispatch(addWeekAndPersist(user_id, program_id)),

            }
        }
)(styled(ProgramView))
