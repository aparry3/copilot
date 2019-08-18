import React from "react";
import { InputLabel } from '../util';

export class ExercisesPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exercises: [],
            loading: true,
            selected_exercise: null,
            search_text: ''
        };
        this.props = props
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);


    }
    componentDidMount() {
        fetch("http://localhost:3000/exercises")
            .then(response => response.json())
            .then(json => this.setState({exercises: json}))
            .catch(err => console.error(err));
    }
    handleSelect(exercise) {
        this.setState({selected_exercise: exercise});
    }
    handleSubmit(e) {
        e.preventDefault();
        fetch(`http://localhost:3000/exercises?search_text=${this.state.search_text}`)
            .then(response => response.json())
            .then(json => {
                this.setState({exercises: json})
                console.log(json)
            })
            .catch(err => console.error(err));
    }
    handleSearch(e) {
        this.setState({
            search_text: e.target.value
        });
    }

    render() {
        console.log(`updating ui: ${this.state.selected_exercise}`)
        return (
            <div className="container-fluid">
                <div className="container-fluid search-bar">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="search_text">Search: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.search_text}
                                name="search_text"
                                id="search_text"
                                onChange={this.handleSearch}/>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <h1>Exercises</h1>
                        <ul className="exercise-list">
                            {this.state.exercises.map(exercise=>{
                                return <ExerciseListItem handleExerciseSelect={this.handleSelect} key={exercise._id} exercise={exercise}/>;
                            })}
                        </ul>
                    </div>
                    <div className="col-md-8">
                        <Exercise exercise={this.state.selected_exercise}/>
                    </div>
                </div>
            </div>
        );
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
                <h6>{this.state.exercise.primary_muscles}</h6>
            </li>
        )
    }
}

class Exercise extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exercise: props.exercise ? props.exercise : null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({exercise: nextProps.exercise})
    }
    handleChange(name, value) {
        console.log("handling change in parent")
        console.log(value)
        let exercise = this.state.exercise;
        exercise[name] = value;
        this.setState({
            exercise: exercise
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.exercise);
        fetch(`http://localhost:3000/exercises/${this.state.exercise._id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.exercise)
        }).then(res => {
            if (res.status > 300) {
                alert(`ERROR: ${res.status}: ${res.statusText}`);
                return;
            }
            console.log(res)
            alert(`Successfully update exercise: ${this.state.exercise.name}`);
        }).catch(err => {
            console.log(err);
            alert(err);
        });
    }
    render() {
        return (
            <div>
                    {this.state.exercise != null ? (
                    <form onSubmit={this.handleSubmit}>
                        {Object.keys(this.state.exercise).map(key => {
                            return (<div key={key}>
                                <span>{key}</span>: <InputLabel value={this.state.exercise[key]} name={key} input_type="text" onChange={this.handleChange} />
                            </div>)
                        })}
                        <div>
                            <input className="btn btn-primary" type="submit" value="submit" />
                        </div>
                    </form>
                    ) : (
                        <p>No exercsie selected</p>
                    )}
            </div>
        )
    }
}
