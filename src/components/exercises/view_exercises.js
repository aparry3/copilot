import React from 'react';
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {persistExercise} from '../../actions'
import {ExerciseForm} from './exercise_form';
import { normalize, titleCase } from '../util';
import {Grid, Paper, List, ListItem, ListItemText, Typography} from '@material-ui/core';
import {SearchBar} from './search_bar';

const EXERCISE_LIST_WIDTH = 250;

const styled = withStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    viewExercisesContainer: {
        flexGrow: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        paddingTop: '20px',
        height: '85%',
        overflow: 'hidden'
    },
    exercisesListContainer: {
        width: '30%',
        height: '100%',
        overflow: 'auto',
        background: theme.palette.background.light
    },
    exerciseViewContainer: {
        width: '70%',
        height: '100%',
        paddingLeft: '20px'
    }
}))

class ViewExercisesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_exercise_index: null
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }

    handleSelect(index) {
        this.setState({selected_exercise_index: index});
    }
    handleCancel(){
        this.setState({
            selected_exercise_index: null
        });
    }

    render() {
        let classes = this.props.classes;
        return (
            <>
                <SearchBar onNewExercise={this.props.onNewExercise} />
                <div className={classes.viewExercisesContainer} >
                    <div className={classes.exercisesListContainer} >
                        <List >
                            {this.props.exercises.map((exercise, index)=>{
                                return <ExerciseListItem index={index} handleExerciseSelect={this.handleSelect} key={exercise._id} exercise={exercise}/>;
                            })}
                        </List>
                    </div>
                    <div className={classes.exerciseViewContainer}>
                        <Paper>
                            { this.state.selected_exercise_index != null && (
                                <ExerciseForm onSave={this.props.onSave} exercise={this.props.exercises[this.state.selected_exercise_index]} onCancel={this.handleCancel}/>
                            )}
                        </Paper>
                    </div>
                </div>
            </>
        )
    }
}
class ExerciseListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);

    }
    handleSelect(e) {
        this.props.handleExerciseSelect(this.props.index)
    }
    render() {
        return (
            <ListItem onClick={this.handleSelect}>
                <ListItemText primary={<Typography variant='h6'>{this.props.exercise.name}</Typography>}
                secondary={(
                    <Typography variant='body2'>
                        {this.props.exercise.primary_muscles.map(muscle => {
                            return titleCase(muscle)
                        }).join(', ')}
                    </Typography>)}
                />
            </ListItem>
        )
    }
}

function applyExercisesFilter(exercises) {
    let filtered = exercises.items.filter(item => {
        return !exercises.filter || item.name.includes(exercises.filter)
    })
    return filtered;
}


export const ViewExercises = connect(
    (state) => {
        return {
            exercises: applyExercisesFilter(state.exercises)
        }
    },
    (dispatch) => {
        return {
            onSave: (exercise) => dispatch(persistExercise(exercise)),
        }
    }
)(styled(ViewExercisesView))
