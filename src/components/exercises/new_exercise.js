import React from 'react';
import { connect } from 'react-redux';
import {PageHeader} from '../utils'
import { withRouter } from "react-router";
import {withStyles} from '@material-ui/styles'
import {showExerciseForm, persistExercise, setActivePage} from '../../actions';
import {ExerciseForm} from './exercise_form';

const styles = theme => ({
    exerciseFormPage: {
        width: '100%',
        height: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
    }
})

let styled = withStyles(styles)

class NewExerciseView extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.finishAddingExercise = this.finishAddingExercise.bind(this);

    }

    finishAddingExercise() {
        this.props.finishAddingExercise()
        this.props.setActivePage(this.props.previous_page)
        if (this.props.previous_page != 'exercises') {
            this.props.history.goBack()
        }
    }

    handleSave(exercise) {
        this.props.onSave(exercise).then(exercise => {
            this.finishAddingExercise()
        });
    }

    handleCancel(){
        this.finishAddingExercise()
    }
    render() {
        let {classes} = this.props
        return (
            <div className={classes.exerciseFormPage}>
                <PageHeader >
                    <span>New Exercises</span>
                </PageHeader>
                <ExerciseForm onSave={this.handleSave} exercise={this.props.exercise} onCancel={this.handleCancel}/>
            </div>
        )
    }
}

export const NewExercise = connect(
    (state) => ({
        exercise: state.exercises.current_exercise,
        previous_page: state.exercises.previous_page
    }),
    (dispatch) => {
        return {
            onSave: (exercise) => dispatch(persistExercise(exercise)),
            setActivePage: (previous_page) => dispatch(setActivePage(previous_page)),
            finishAddingExercise: () => dispatch(showExerciseForm(false, null))
        }
    }
)(withRouter(styled(NewExerciseView)))
