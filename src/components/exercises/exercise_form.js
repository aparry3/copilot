import clsx from 'clsx'
import React, {useState} from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { normalize, titleCase, CustomSelect } from '../util';
import { allMuscles, CATEGORIES, EXERCISE } from '../../constants/exercises';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';
import update from 'immutability-helper';

const styled = withStyles(theme => ({
    exerciseForm: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: theme.text.primary,
        padding: '10px',
        background: theme.palette.background.main,
        overflow: 'auto'
    },
    formSection: {
        flexGrow: 1,
        boxShadow: `0px 0px 8px -5px ${theme.palette.background.dark}`,
        background: theme.palette.background.light,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: '20px',
        padding: '10px'
    },
    formSectionContainer: {
        display: 'flex',
        width: '90%'
    },
    formSectionHeader: {
        height: '20px',
        width: '100%',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'flex-start',
        textAlign: 'center',
        fontSize: '12px',
        fontWeight: 300
    },
    form: {
        width: '100%',
        height: '100%'
    },
    formSectionInput: {
        color: theme.text.primary,
        background: 'transparent',
        border: 'none',
        outline: 'none',
        width: '100%',
        padding: '5px',
        '&:hover': {
            background: theme.palette.background.main
        },
        '&:focus': {
            background: theme.palette.background.mediumDark
        }
    },
    nameInput: {
        fontSize: '25px',
        fontWeight: 100
    },
    formSectionInputContainer: {
        padding: '5px',
        width: '100%'
    },
    description: {
        minWidth: '50%'
    }
}));

function initializeExercise(exercise) {
    return !!exercise ? {...exercise} : {...EXERCISE}
}

class ExerciseFormView extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            exercise: initializeExercise(props.exercise)
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.all_muscles = allMuscles()
        this.transform = {
            primary_muscles: (x) => x.map(y => this.all_muscles.find(m => m.name == y)),
            primary_muscles: (x) => x.map(y => this.all_muscles.find(m => m.name == y))
        }
        console.log(props.exercise)

    }
    componentWillReceiveProps(nextProps) {
        this.setState({exercise: initializeExercise(nextProps.exercise)})
    }
    handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        let transform = !!this.transform[name] ? this.transform[name] : (x) => x
        this.setState({
            exercise: {
                ...this.state.exercise,
                [name]: transform(value)

            }
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.onSave(this.state.exercise)
    }

    handleCancel(e) {
        e.preventDefault()
        this.props.onCancel()
    }

    render() {
        const classes = this.props.classes;
        return (
            <form className={classes.form} onSubmit={this.handleSubmit}>
                <div className={classes.exerciseForm}>
                    <div className={classes.formSectionContainer}>
                        <div className={clsx(classes.formSection)}>
                            <div className={classes.formSectionHeader}><span>Name</span></div>
                            <div className={classes.formSectionInputContainer}><input autocomplete="off" className={clsx(classes.nameInput, classes.formSectionInput)} id="name" name='name' onChange={this.handleChange} value={this.state.exercise.name} /></div>
                        </div>
                    </div>
                    <div className={classes.formSectionContainer}>
                        <div className={clsx(classes.formSection, classes.description)}>
                            <div className={classes.formSectionHeader}><span>Description</span></div>
                            <div className={classes.formSectionInputContainer}><textarea autocomplete="off" className={classes.formSectionInput} id='description' name='description' onChange={this.handleChange} value={this.state.exercise.description} /></div>
                        </div>
                        <div className={clsx(classes.formSection)}>
                            <div className={classes.formSectionHeader}><span>Categories</span></div>
                            <CustomSelect multiple placeholder="Categories..." name="categories" onChange={this.handleChange} value={this.state.exercise.categories} elements={CATEGORIES}/>
                        </div>
                    </div>
                    <div className={classes.formSectionContainer}>
                        <div className={clsx(classes.formSection)}>
                            <div className={classes.formSectionHeader}><span>Primary muscles</span></div>
                            <CustomSelect multiple placeholder='Add primary muscles...' name='primary_muscles' onChange={this.handleChange} value={this.state.exercise.primary_muscles.map(m => m.name)} elements={this.all_muscles.map(m => m.name)} />
                        </div>
                    </div>
                    <div className={classes.formSectionContainer}>
                        <div className={clsx(classes.formSection)}>
                            <div className={classes.formSectionHeader}><span>Secondary muscles</span></div>
                            <CustomSelect multiple placeholder='Add secondary muscles...' name='secondary_muscles' onChange={this.handleChange} value={this.state.exercise.secondary_muscles.map(m => m.name)} elements={this.all_muscles.map(m => m.name)} />
                        </div>
                    </div>
                    <div className={classes.formSectionContainer}>
                    </div>
                    <div>
                        <input className="btn btn-primary" type="submit" value="submit" />
                    </div>
                    <div>
                        <button className="btn btn-light" onClick={this.handleCancel}>Cancel</button>
                    </div>
                </div>
            </form>

        )
    }
}
// <Select multiple id='primary_muscles' name='primary_muscles' onChange={this.handleChange} value={this.state.exercise.primary_muscles}>
//     {allMuscles().map(muscle => {
//         return <MenuItem key={`primary-${muscle}`} value={muscle}>{muscle}</MenuItem>
//     })}
// </Select>

export const ExerciseForm =  styled(ExerciseFormView);
