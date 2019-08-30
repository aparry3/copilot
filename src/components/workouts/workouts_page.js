import React from "react";
import { connect } from 'react-redux';
import {fade, withStyles} from '@material-ui/core/styles';
import {Grid, List, ListItem, Typography, Card} from '@material-ui/core'
import {SIDEBAR_WIDTH} from '../styles'
import {addExerciseToWorkout} from '../../actions';
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
const CLIENT='client';

const Week = (props) => {
    let {windex, week, classes} = props;
    return (
        <Grid key={`w${windex}`} item xs={12} className={classes.week}>
            <List className={classes.list} >
                {props.children}
            </List>
        </Grid>

    )
}

const Day = (props) => {
    function renderExercise(exercise_group) {
        console.log(exercise_group.exercise_name)
        return exercise_group.exercise_id ? (
            <Card>{exercise_group.exercise_name}</Card>
        ) : (
            <Card>
                <List>
                    {exercise_group.exercises.map((ex, index)=> {
                        return (<ListItem>{renderExercise(ex)}</ListItem>)
                    })}
                </List>
            </Card>
        )
    }

    let {windex, dindex, day, classes} = props;
    console.log(`${dindex}: day`)

    return (
        <ListItem className={classes.day} key={`w${windex}d${dindex}`}>
            <Typography variant="h6">Day {dindex + 1}</Typography>
            <List>
                {day.exercises && day.exercises.map((exercise_group, eindex) => {
                    return (
                        renderExercise(exercise_group)
                    )
                })}
                <ListItem><button className='btn btn-success' onClick={() => props.onAddExercise(windex, dindex)}>Add Exercise</button></ListItem>
            </List>
        </ListItem>
    )
}
class WorkoutsPageView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exercise: {
                id: '123',
                name: 'added exeercise'
            },
            modalIsOpen: false
        }
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddExercise = this.handleAddExercise.bind(this)
    }

    handleAddExercise(week_index, day_index) {
        console.log(this.state)
        this.setState({
            modalIsOpen: true,
            week: week_index,
            day: day_index
        })
        // this.props.addExercise('client', week_index, day_index, this.state.exercise)
    }
    handleModalClose() {
        this.setState({
            modalIsOpen: false
        })

    }
    handleSubmit(exercise) {
        this.props.addExercise('client', this.state.week, this.state.day, exercise)
        this.handleModalClose();

    }
    render() {
        console.log(`Workouts: ${this.props.clients}`);

        let classes = this.props.classes;
        console.log(this.props.clients[CLIENT])
        return (
            <div className={classes.root}>
                <ExerciseModal onSubmit={this.handleSubmit} open={this.state.modalIsOpen} onClose={this.handleModalClose}/>
                <Grid container>
                    {this.props.clients[CLIENT].program.map((week, windex) => {
                        return (
                            <Week windex={windex} week={week} classes={classes} >
                                {week.map((day, dindex) => {
                                    return (<Day windex={windex} dindex={dindex} day={day} classes={classes} onAddExercise={this.handleAddExercise}/>)
                                })}
                            </Week>
                        )
                    })}
                </Grid>
            </div>
        );
    }
}


export const WorkoutsPage = connect(
        (state) => {
            return {
                clients: state.clients
            }
        },
        (dispatch) => {
            return {
                addExercise: (client, windex, dindex, exercise) => dispatch(addExerciseToWorkout(client, windex, dindex, exercise))
            }
        }
)(styled(WorkoutsPageView))
