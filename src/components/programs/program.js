import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import {fade, withStyles} from '@material-ui/core/styles';
import {Grid, Button, List, ListItem, Typography, Card, CardActions, CardActionArea, CardContent} from '@material-ui/core'
import {SIDEBAR_WIDTH} from '../styles'
import {getProgram, editWeek, addWeekAndPersist, addProgramAndPersist} from '../../actions';
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
        <Grid key={week_id} item xs={12} className={classes.week}>
            <List className={classes.list} >
            {Object.keys(week.days).map((day, dindex) => {
                return (<Day key={`${week_id}-${dindex}`} week_id={week_id} workout={week.days[day]} day={day} classes={classes} onAddExercise={props.onAddExercise}/>)
            })}
            </List>
        </Grid>

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
        <div className={classes.programPage}>
        {!!program ? (
        <div className={classes.programContainer}>
            <ExerciseModal onSubmit={handleSubmit} open={modalIsOpen} onClose={handleModalClose}/>
            <Grid container>
                {program.weeks.map((week, windex) => {
                    return (
                        <Week key={`${week._id}`} week_id={week._id} week={week} classes={classes} onAddExercise={handleAddExercise}/>
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
