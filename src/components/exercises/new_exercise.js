import React from 'react';
import { connect } from 'react-redux';
import {ProgramHeader} from '../programs/program_header'
import {withStyles} from '@material-ui/styles'
import {showExerciseForm, persistExercise} from '../../actions';
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

    }
    handleSave(exercise) {
        this.props.onSave(exercise).then(exercise => {
            this.props.finishAddingExercise()
        });
    }

    handleCancel(){
        this.props.finishAddingExercise()
    }
    render() {
        let {classes} = this.props
        return (
            <div className={classes.exerciseFormPage}>
                <ProgramHeader >
                    <span>New Exercises</span>
                </ProgramHeader>
                <ExerciseForm onSave={this.handleSave} exercise={this.props.exercise} onCancel={this.handleCancel}/>
            </div>
        )
    }
}

export const NewExercise = connect(
    (state) => ({
        exercise: state.exercises.current_exercise
    }),
    (dispatch) => {
        return {
            onSave: (exercise) => dispatch(persistExercise(exercise)),
            finishAddingExercise: () => dispatch(showExerciseForm(false, null))
        }
    }
)(styled(NewExerciseView))
