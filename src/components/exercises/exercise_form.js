import React from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { normalize, titleCase } from '../util';
import { allMuscles, CATEGORIES } from '../../constants/exercises';
import MenuItem from '@material-ui/core/MenuItem';
import {styled} from '../styles'

class ExerciseForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exercise: props.exercise ? props.exercise : null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.exercise)
        this.setState({exercise: nextProps.exercise})
    }
    handleChange(e) {
        console.log("handling change in parent")
        let name = e.target.name;
        let value = e.target.value;
        console.log(value)

        let exercise = this.state.exercise;
        exercise[name] = value;
        this.setState({
            exercise: exercise
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.exercise)
    }
    handleCancel(e) {
        e.preventDefault()
        this.props.onCancel()
    }
    render() {
        const classes = this.props.classes;
        if (this.state.exercise) console.log(this.state.exercise.primary_muscles)
        return (
            <div>
                {this.state.exercise != null ? (
                <form onSubmit={this.handleSubmit}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input id="name" name='name' onChange={this.handleChange} value={this.state.exercise.name} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="description">Description</InputLabel>
                        <Input id='description' name='description' onChange={this.handleChange} value={this.state.exercise.description} />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="primary_muscles">Primary Muscles</InputLabel>
                        <Select multiple id='primary_muscles' name='primary_muscles' onChange={this.handleChange} value={this.state.exercise.primary_muscles}>
                            {allMuscles().map(muscle => {
                                return <MenuItem key={`primary-${muscle}`} value={muscle}>{muscle}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="secondary_muscles">Secondary Muscles</InputLabel>
                        <Select multiple id="secondary_muscles" name='secondary_muscles' onChange={this.handleChange} value={this.state.exercise.secondary_muscles}>
                            {allMuscles().map(muscle => {
                                return <MenuItem key={`secondary-${muscle}`} value={muscle}>{muscle}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="categories">Categories</InputLabel>
                        <Select id="categories"name='categories' onChange={this.handleChange} value={this.state.exercise.categories}>
                            {CATEGORIES.map(muscle => {
                                return <MenuItem key={`secondary-${muscle}`} value={muscle}>{muscle}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <div>
                        <input className="btn btn-primary" type="submit" value="submit" />
                    </div>
                    <div>
                        <button className="btn btn-light" onClick={this.handleCancel}>Cancel</button>
                    </div>

                </form>
                ) : (
                    <p>No exercsie selected</p>
                )}
            </div>
        )
    }
}
export default styled(ExerciseForm);
