import React from "react";
import { connect } from 'react-redux';
import {fade, withStyles} from '@material-ui/core/styles';
import {ViewExercises} from './view_exercises';
import {NewExercise} from './new_exercise';
import {setFilter} from '../../actions'
import {SearchBar} from './search_bar';
import {SIDEBAR_WIDTH} from '../styles'
const styled = withStyles(theme => ({

}));


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
        let classes = this.props.classes;
        return (
            <div >
                <SearchBar onNewExercise={this.handleNewExercise}/>
                    {this.state.is_adding ? (
                        <NewExercise onEditOver={this.handleEditOver}/> ) : (
                        <ViewExercises /> )
                    }
            </div>
        );
    }
}

export const ExercisesPage = connect(
        (state) => {
            return {
                statuses: state.exercises.statuses
            }
        },
        null
)(styled(ExercisesPageView))
