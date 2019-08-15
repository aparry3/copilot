import React from "react";

export class ExercisesPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exercises: [],
            loading: true,
            selected_exercise: null
        };
        this.props = props
        this.handleSelect = this.handleSelect.bind(this);
    }
    componentDidMount() {
        fetch("http://localhost:3000/exercises")
            .then(response => response.json())
            .then(json => this.setState({exercises: json}))
            .catch(err => console.error(err));
    }
    handleSelect(exercise) {
        this.setState({selected_exercise: exercise})
    }

    render() {
        console.log(`updating ui: ${this.state.selected_exercise}`)
        return (
            <div>
                <div>
                    <h1>Exercises</h1>
                    <ul>
                        {this.state.exercises.map(exercise=>{
                            return <ExerciseListItem handleExerciseSelect={this.handleSelect} key={exercise._id} exercise={exercise}/>;
                        })}
                    </ul>
                </div>
                <div>
                    <Exercise exercise={this.state.selected_exercise}/>
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
    }
    componentWillReceiveProps(nextProps) {
        this.setState({exercise: nextProps.exercise})
    }

    render() {
        console.log(`props: ${this.props.exercise}`)
        console.log(`state: ${this.state.exercise}`);
        return (
            <div>
                {this.state.exercise != null ? (
                    Object.keys(this.state.exercise).map(key => {
                        return <p>{key}: {this.state.exercise[key]}</p>
                    })
                ) : (
                    <p>No exercsie selected</p>
                )}
            </div>
        )
    }
}
