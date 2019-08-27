import React from 'react';
import { connect } from 'react-redux';

import {persistExercise} from '../../actions';
import {ExerciseForm} from './exercise_form';
import { EXERCISE } from '../../constants/exercises';


class NewExerciseView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            new_exercise: {...EXERCISE}
        };
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }
    handleSave(exercise) {
        this.props.onSave(exercise).then(exercise => {
            this.setState({
                new_exercise: {...EXERCISE}
            });
            this.props.onEditOver()
        });
    }

    handleCancel(){
        this.setState({
            new_exercise: {...EXERCISE}
        })
        this.props.onEditOver()
    }
    render() {
        console.log(this.state.new_exercise)
        return (
            <div className="container">
                <h2>New Exercise</h2>
                <ExerciseForm onSave={this.handleSave} exercise={this.state.new_exercise} onCancel={this.handleCancel}/>
            </div>
        )
    }
}

export const NewExercise = connect(
    null,
    (dispatch) => {
        return {
            onSave: (exercise) => dispatch(persistExercise(exercise))
        }
    }
)(NewExerciseView)
