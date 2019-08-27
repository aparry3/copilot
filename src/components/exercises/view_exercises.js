import React from 'react';
import { connect } from 'react-redux';

import {persistExercise} from '../../actions'
import {ExerciseForm} from './exercise_form';
import { normalize, titleCase } from '../util';

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
            selected_exercise: null
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div id="exercise_list_header">
                        <h1>Exercises:</h1>
                    </div>
                    <ul className="exercise-list">
                        {this.props.exercises.map((exercise, index)=>{
                            console.log(exercise)
                            return <ExerciseListItem index={index} handleExerciseSelect={this.handleSelect} key={exercise._id} exercise={exercise}/>;
                        })}
                    </ul>
                </div>
                { this.state.selected_exercise_index != null && (
                    <div className="col-md-8">
                        <ExerciseForm onSave={this.props.onSave} exercise={this.props.exercises[this.state.selected_exercise_index]} onCancel={this.handleCancel}/>
                    </div>
                )}
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
            <li onClick={this.handleSelect}>
                <h4>{this.props.exercise.name}</h4>
                <h6>{this.props.exercise.primary_muscles.map(muscle => {
                    return titleCase(muscle)
                }).join(', ')}</h6>
            </li>
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
)(ViewExercisesView)
