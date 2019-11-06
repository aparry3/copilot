import clsx from 'clsx'
import React from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { normalize, titleCase } from '../util';
import { allMuscles, CATEGORIES } from '../../constants/exercises';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';

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
        background: theme.palette.background.mediumDark
    },
    formSection: {
        width: '100%',
        boxShadow: `0px 0px 8px -5px ${theme.palette.background.dark}`,
        background: theme.palette.background.light,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: '20px',
        padding: '10px'
    },
    formSectionHeader: {
        height: '20px',
        width: '100%',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'flex-start',
        textAlign: 'center'
    },
    form: {
        width: '100%'
    }
}));


class ExerciseFormView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exercise: props.exercise ? {...props.exercise} : null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }
    componentWillReceiveProps(nextProps) {
        this.setState({exercise: nextProps.exercise})
    }
    handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;

        this.setState({
            exercise: {
                ...this.state.exercise,
                [name]: value
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
            <div className={classes.exerciseForm}>
                <form className={classes.form} onSubmit={this.handleSubmit}>
                    <div className={clsx(classes.formSection)}>
                        <div className={classes.formSectionHeader}><span>Name</span></div>
                        <div><input id="name" name='name' onChange={this.handleChange} value={this.state.exercise.name} /></div>
                    </div>
                    <div className={clsx(classes.formSection)}>
                        <div className={classes.formSectionHeader}><span>Description</span></div>
                        <input id='description' name='description' onChange={this.handleChange} value={this.state.exercise.description} />
                    </div>
                    <div className={clsx(classes.formSection)}>
                    <div className={classes.formSectionHeader}><span>Primary muscles</span></div>
                        <Select multiple id='primary_muscles' name='primary_muscles' onChange={this.handleChange} value={this.state.exercise.primary_muscles}>
                            {allMuscles().map(muscle => {
                                return <MenuItem key={`primary-${muscle}`} value={muscle}>{muscle}</MenuItem>
                            })}
                        </Select>
                    </div>
                    <div className={clsx(classes.formSection)}>
                        <div className={classes.formSectionHeader}><span>Secondary muscles</span></div>
                        <Select multiple id="secondary_muscles" name='secondary_muscles' onChange={this.handleChange} value={this.state.exercise.secondary_muscles}>
                            {allMuscles().map(muscle => {
                                return <MenuItem key={`secondary-${muscle}`} value={muscle}>{muscle}</MenuItem>
                            })}
                        </Select>
                    </div>
                    <div className={clsx(classes.formSection)}>
                        <div className={classes.formSectionHeader}><span>Categories</span></div>
                        <Select id="categories"name='categories' onChange={this.handleChange} value={this.state.exercise.categories}>
                            {CATEGORIES.map(muscle => {
                                return <MenuItem key={`secondary-${muscle}`} value={muscle}>{muscle}</MenuItem>
                            })}
                        </Select>
                    </div>
                    <div>
                        <input className="btn btn-primary" type="submit" value="submit" />
                    </div>
                    <div>
                        <button className="btn btn-light" onClick={this.handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}
export const ExerciseForm =  styled(ExerciseFormView);
