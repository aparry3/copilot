import React from 'react';
import { connect } from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {persistExercise} from '../../actions'
import {ExerciseForm} from './exercise_form';
import { normalize, titleCase } from '../util';
import {Grid, Paper, List, ListItem, ListItemText, Typography} from '@material-ui/core';

const EXERCISE_LIST_WIDTH = 250;

const styled = withStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    container: {
        flexGrow:1,
    },
    drawer: {
      width: EXERCISE_LIST_WIDTH,
      flexShrink: 0,
    },
    drawerPaper: {
      width: EXERCISE_LIST_WIDTH,
    },
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
        console.log(index)
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
            <div >
                <Grid container className={classes.container} >
                    <Grid item xs={3} >
                        <Paper>
                            <List style={{maxHeight: '100vh', overflow: 'auto'}}>
                                <ListItem><div className={classes.toolbar} /></ListItem>
                                {this.props.exercises.map((exercise, index)=>{
                                    console.log(exercise)
                                    return <ExerciseListItem index={index} handleExerciseSelect={this.handleSelect} key={exercise._id} exercise={exercise}/>;
                                })}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={9} >
                        <Grid container justify="center" >
                            <Grid item>
                                <Paper>
                                    <div className={classes.toolbar} />

                                    { this.state.selected_exercise_index != null && (
                                        <ExerciseForm onSave={this.props.onSave} exercise={this.props.exercises[this.state.selected_exercise_index]} onCancel={this.handleCancel}/>
                                    )}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
class ExerciseListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);

    }
    handleSelect(e) {
        console.log("here");
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
    console.log(exercises)
    let filtered = exercises.items.filter(item => {
        return !exercises.filter || item.name.includes(exercises.filter)
    })
    console.log(filtered);
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
