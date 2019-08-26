import React from "react";
import { InputLabel, normalize, titleCase } from '../util';
import ExerciseForm from './exercise_form';
import { EXERCISE, MUSCLE_GROUPS, CATEGORIES, allExercises } from '../../constants/exercises';

export class ExercisesPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            is_adding: false,
            filter_text: ''
        };
        this.props = props
        this.setFilter = this.setFilter.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.addExercise = this.addExercise.bind(this);
        this.handleSave = this.handleSave.bind(this)
        this.handleCancel = this.handleCancel.bind(this)



    }
    setFilter(e) {
        e.preventDefault();
        console.log(`Set Filter text: ${this.state}`)
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
    handleCancel() {
        this.setState({
            is_adding: false,
        })
    }
    handleSave(exercise) {
        this.setState({
            is_adding: false
        });
        this.props.addExercise(exercise);
    }
    addExercise(e) {
        e.preventDefault()
        this.setState({
            is_adding: true
        })
    }

    render() {
        console.log(`updating ui: ${this.state.filter_text}`)
        return (
            <div id="exercises_page">
                <div id="exercise_search" className="container-fluid">
                    <form onSubmit={this.setFilter} className="form-inline">
                        <div className="form-group">
                            <input type="text"
                                className="form-control mx-3"
                                value={this.state.filter_text}
                                name="search_text"
                                id="search_text"
                                onChange={this.handleFilterChange}
                                placeholder="Search: "/>
                        </div>
                    </form>
                    <button className="btn btn-success" onClick={this.addExercise}>Add Exercise</button>
                </div>
                <div id="exercises_container" className="container">
                    {this.state.is_adding ? (
                        <NewExercise onSave={this.handleSave} onCancel={this.handleCancel}/> ) : (
                        <DisplayExercises onSave={this.props.editExercise} exercises={this.props.exercises} onCancel={this.handleCancel}/> )
                    }
                </div>
            </div>
        );
    }
}

class DisplayExercises extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: props.exercises,
            selected_exercise: null
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }
    componentWillReceiveProps(nextProps) {
        this.setState({exercises: nextProps.exercises})
    }
    handleSelect(exercise) {
        this.setState({selected_exercise: exercise});
    }
    handleCancel(){
        this.setState({
            selected_exercise: null
        });
        this.props.onCancel();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div id="exercise_list_header">
                        <h1>Exercises:</h1>
                    </div>
                    <ul className="exercise-list">
                        {this.state.exercises.map(exercise=>{
                            return <ExerciseListItem handleExerciseSelect={this.handleSelect} key={exercise._id} exercise={exercise}/>;
                        })}
                    </ul>
                </div>
                <div className="col-md-8">
                    <ExerciseForm onSubmit={this.props.onSave} exercise={this.state.selected_exercise} onCancel={this.handleCancel}/>
                </div>
            </div>
        )
    }
}

class NewExercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            new_exercise: {...EXERCISE}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }
    handleSubmit(exercise) {
        this.props.onSave(exercise);
        this.setState({
            new_exercise: {...EXERCISE}
        });
    }
    handleCancel(){
        this.setState({
            new_exercise: {...EXERCISE}
        })
        this.props.onCancel()
    }
    render() {
        console.log(this.state.new_exercise)
        return (
            <div className="container">
                <h2>New Exercise</h2>
                <ExerciseForm onSubmit={this.handleSubmit} exercise={this.state.new_exercise} onCancel={this.props.onCancel}/>
            </div>
        )
    }
}

class ExerciseListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            exercise: props.exercise
        }
    }
    handleSelect(e) {
        this.props.handleExerciseSelect(this.state.exercise)
    }
    render() {
        return (
            <li onClick={this.handleSelect}>
                <h4>{this.state.exercise.name}</h4>
                <h6>{this.state.exercise.primary_muscles.map(muscle => {
                    return titleCase(muscle)
                }).join(', ')}</h6>
            </li>
        )
    }
}
