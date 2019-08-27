import React from "react";
import { connect } from 'react-redux';
import {ViewExercises} from './view_exercises';
import {NewExercise} from './new_exercise';
import {setFilter} from '../../actions'


class ExercisesPageView extends React.Component {
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
        this.handleNewExercise = this.handleNewExercise.bind(this);
        this.handleEditOver = this.handleEditOver.bind(this)
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
    handleEditOver() {
        this.setState({
            is_adding: false,
        })
    }

    handleNewExercise(e) {
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
                    <button className="btn btn-success" onClick={this.handleNewExercise}>Add Exercise</button>
                </div>
                <div id="exercises_container" className="container">
                    {this.state.is_adding ? (
                        <NewExercise onEditOver={this.handleEditOver}/> ) : (
                        <ViewExercises /> )
                    }
                </div>
            </div>
        );
    }
}

export const ExercisesPage = connect(
        null,
        (dispatch) => {
            return {
                setFilter: (filter_text) => dispatch(setFilter(filter_text))
            }
        }
)(ExercisesPageView)
