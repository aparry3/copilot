import clsx from 'clsx'
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
    },
    exerciseViewContainer: {
        width: '70%',
        height: '100%',
        paddingLeft: '20px'
    },
    exerciseListItem: {
        background: theme.palette.background.light,
        boxShadow: `0px 0px 8px -5px ${theme.palette.background.dark}`,
        borderBottom: `1px solid ${theme.palette.background.dark}`,
        '&:last-child': {
            borderBottom: 'none'
        },
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.background.main
        },
        height: '80px'

    },
    exerciseListItemContent: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '10px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'

    },
    exerciseList: {
        style: 'none',
        margin: 0,
        padding: 0
    },
    exerciseName: {
        height: '65%',
        width: '100%',
        fontSize: '22px',
        color: theme.text.white,
        fontWeight: 100,
        overflow:'hidden',
        textOverflow: 'ellipsis'
    },
    exerciseDetails: {
        height: '35%',
        width: '100%',
        color: theme.text.primary,
        fontSize: '12px',
        fontWeight: '200'
    },
    selected: {
        background: theme.palette.background.main
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
                        <ul className={classes.exerciseList}>
                        {this.props.exercises.map((exercise, index)=>{
                            return <ExerciseListItem selected={index==this.state.selected_exercise_index} index={index} handleExerciseSelect={this.handleSelect} key={exercise._id} exercise={exercise}/>;
                        })}
                        </ul>
                    </div>
                    <div className={classes.exerciseViewContainer}>
                            { this.state.selected_exercise_index != null && (
                                <ExerciseForm onSave={this.props.onSave} exercise={this.props.exercises[this.state.selected_exercise_index]} onCancel={this.handleCancel}/>
                            )}
                    </div>
                </div>
            </>
        )
    }
}
const ExerciseListItem = styled((props) => {
    let {classes} = props
    function handleSelect(e) {
        props.handleExerciseSelect(props.index)
    }
    let css_class = props.selected ? clsx(classes.exerciseListItem, classes.selected) : clsx(classes.exerciseListItem)
    return (
        <li className={css_class}>
            <div className={classes.exerciseListItemContent} onClick={handleSelect}>
                <div className={classes.exerciseName}>{props.exercise.name}</div>
                <div className={classes.exerciseDetails}>
                    {props.exercise.primary_muscles.map(muscle => {
                        return titleCase(muscle)
                    }).join(', ')}
                </div>
            </div>
        </li>
    )

})

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
