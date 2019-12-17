import React from "react";
import { connect } from 'react-redux';
import {fade, withStyles} from '@material-ui/core/styles';
import {ViewExercises} from './view_exercises';
import {NewExercise} from './new_exercise';
import {showExerciseForm, tFilter} from '../../actions'
import {SIDEBAR_WIDTH} from '../styles'

const styled = withStyles(theme => ({
    exercisesPageContainer: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    }
}));


class ExercisesPageView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            filter_text: ''
        };
        this.props = props
        this.setFilter = this.setFilter.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleNewExercise = this.handleNewExercise.bind(this);
        this.handleEditOver = this.handleEditOver.bind(this)
    }

    setFilter(e) {
        e.preventDefault();
        this.props.setFilter(this.state.filter_text)
    }
    handleFilterChange(e) {
        this.setState({
            filter_text: e.target.value
        });
        if (e.target.value.length > 2) {
            this.props.setFilter(e.target.value)
        }
    }
    handleEditOver() {
        this.props.finishAddingExercise()

    }

    handleNewExercise(e) {
        e.preventDefault()
        this.props.addNewExercise()
    }

    handleEditExercise(e, exercise) {
        e.preventDefault()
        this.props.editExercise(exercise)
    }


    render() {
        console.log(this.props.show_exercise_form)
        let classes = this.props.classes;
        return (
            <div className={classes.exercisesPageContainer}>
                    {this.props.show_exercise_form ? (
                        <NewExercise /> ) : (
                        <ViewExercises /> )
                    }
            </div>
        );
    }
}

export const ExercisesPage = connect(
        (state) => ({
            show_exercise_form: state.exercises.show_exercise_form,
            statuses: state.exercises.statuses
        })
)(styled(ExercisesPageView))
