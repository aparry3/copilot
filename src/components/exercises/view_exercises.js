import clsx from 'clsx'
import React from 'react';
import AddIcon from '@material-ui/icons/Add'
import CreateIcon from '@material-ui/icons/Create';
import { connect } from 'react-redux';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import {persistExercise, showExerciseForm} from '../../actions'
import {ExerciseForm} from './exercise_form';
import {ProgramHeader} from '../programs/program_header'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { normalize, titleCase, MuscleGroup } from '../util';
import {Grid, Paper, List, ListItem, ListItemText, Typography} from '@material-ui/core';
import {SearchBar} from './search_bar';
import {ViewExercise} from './view_exercise'
import {MUSCLE_GROUPS} from '../../constants/exercises'
const EXERCISE_LIST_WIDTH = 250;

const styled = withStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    viewExercisesContainer: {
        flexGrow: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        height: '85%',
        overflow: 'hidden'
    },
    exercisesListPageContainer: {
        minWidth: '65%',
        width: '75%',
        flexGrow: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    exercisesListContainer: {
        width: '100%',
        flexGrow: 1,
        padding: '20px',
        overflow: 'auto',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    exerciseViewContainer: {
        background: theme.palette.background.light,
        height: '100%',
        paddingLeft: '20px',
        padding: '5px',
        minWidth: '30%',
        width: '30%'
    },
    exerciseListItem: {
        background: theme.palette.background.light,
        boxShadow: `0px 0px 8px -5px ${theme.palette.background.dark}`,
        borderBottom: `1px solid ${theme.palette.background.dark}`,
        '&:last-child': {
            borderBottom: 'none'
        },
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.background.main
        },
        height: '80px'

    },
    exerciseListRow: {
        width: '100%',
        display: 'flex',
        minHeight: '60px',
        cursor: 'pointer',
        alignItems: 'center',
        '&:hover': {
            background: theme.palette.background.light
        }
    },
    exerciseListBody: {
        width: '100%',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column'
    },
    exerciseListItemContent: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '10px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'

    },
    exercisesList: {
        style: 'none',
        margin: 0,
        padding: 0
    },
    exerciseListHeader: {
        height: '50px',
        textAlign: 'left',
        width: '100%',
        fontSize: '14px',
        fontWeight: 100,
        color: theme.text.dark,
        opacity: 0.3,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '0px 0px 5px 0px'
    },
    exerciseRowName: {
        width: '50%',
        fontSize: '16px',
        fontWeight: 600,
        padding: '10px'

    },
    exerciseRowCategories: {
        fontWeight: 200,
        fontSize: '14px',
        padding: '10px'

    },
    exerciseRowMuscleGroups: {
        padding: '10px'

    },
    exerciseRowAction: {
        padding: '10px',
        cursor: 'pointer'

    },
    exerciseName: {
        height: '65%',
        width: '100%',
        fontSize: '22px',
        color: theme.text.white,
        fontWeight: 100,
        overflow:'hidden',
        textOverflow: 'ellipsis'
    },
    exerciseDetails: {
        height: '35%',
        width: '100%',
        color: theme.text.primary,
        fontSize: '12px'
    },
    selected: {
        background: theme.palette.background.main
    },
    headerText: {
        fontWeight: 200
    },
    categoriesColumn: {
        width: '20%'
    },
    muscleGroupsColumn: {
        width: '30%'
    },
    actionColumn: {
        width: '10%'
    },
    nameColumn: {
        flexGrow: 2,
        width: '40%'
    },
    hr: {
        width: '100%',
        background: theme.palette.background.dark,
        opacity: 0.1,
        margin: '0',
        border: 0,
        borderTop: '2px solid rgba(0,0,0,.1)'
    },
    exercisesHeaderAction: {
        display: 'flex',
        alignItems: 'center',
        jusitfyContent: 'center',
        height: '100%',
        padding: '20px',
    },
    addIconContainer: {
        cursor: 'pointer',
        '&:hover': {
            background: theme.palette.background.light
        },
        borderRadius: '5px',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center'

    },
    rowActionIconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }


}))

class ViewExercisesView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_exercise_index: null,
            action_selected_index: null
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleActionClick = this.handleActionClick.bind(this)
        this.handleEditClick = this.handleEditClick.bind(this)

    }

    handleEditClick(e, index) {
        e.stopPropagation()
        e.preventDefault()
        this.props.onEditExercise(this.props.exercises[index])
    }

    handleActionClick(e, index) {
        e.stopPropagation()
        e.preventDefault()
        this.setState({
            action_selected_index: index
        })
    }

    handleSelect(index) {
        this.setState({
            selected_exercise_index: index,
            action_selected_index: null
        });
    }
    handleCancel(){
        this.setState({
            selected_exercise_index: null
        });
    }
    // <SearchBar onNewExercise={this.props.onNewExercise} />
//
    render() {
        let classes = this.props.classes;
        return (
            <>
                <div className={classes.viewExercisesContainer} >
                    <div className={classes.exercisesListPageContainer} >
                        <ProgramHeader action={<div className={classes.exercisesHeaderAction}><div onClick={this.props.onNewExercise} className={classes.addIconContainer}><AddIcon /></div></div>}>
                            <span>Exercises</span>
                            <SearchBar />
                        </ProgramHeader>
                        <div className={classes.exercisesListContainer} >
                            <div className={classes.exerciseListHeader} >
                                <div className={classes.nameColumn}><span className={classes.headerText}>Name</span></div>
                                <div className={classes.muscleGroupsColumn}><span className={classes.headerText}>Muscle Group</span></div>
                                <div className={classes.categoriesColumn}><span className={classes.headerText}>Category</span></div>
                                <div className={classes.actionColumn}><span className={classes.headerText}>Action</span></div>
                            </div>
                            <hr className={classes.hr} />
                            <div className={classes.exerciseListBody}>
                                {this.props.exercises.map((exercise, index) => {
                                    return (<ExerciseListItem
                                        onEditClick={(e) => this.handleEditClick(e, index)}
                                        onActionClick={(e) => this.handleActionClick(e, index)}
                                        action_selected={this.state.action_selected_index == index}
                                        selected={index==this.state.selected_exercise_index}
                                        index={index}
                                        handleExerciseSelect={this.handleSelect}
                                        key={exercise._id}
                                        exercise={exercise}/>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    { this.state.selected_exercise_index != null && (
                        <div className={classes.exerciseViewContainer}>
                            <ViewExercise onEditClick={(e) => this.handleEditClick(e, this.state.selected_exercise_index)} exercise={this.props.exercises[this.state.selected_exercise_index]} onCancel={this.handleCancel}/>
                        </div>
                    )}

                </div>
            </>
        )
    }
}


function Categories(props) {
    return (
        <div>
            {props.categories.join(', ')}
        </div>
    )
}

const ExerciseListItem = styled((props) => {
    let {classes} = props
    function handleSelect(e) {
        props.handleExerciseSelect(props.index)
    }
    let css_class = props.selected ? clsx(classes.exerciseListItem, classes.selected) : clsx(classes.exerciseListItem)
    return (
        <div className={classes.exerciseListRow} onClick={handleSelect}>
            <div className={clsx(classes.exerciseRowName, classes.nameColumn)}>{props.exercise.name}</div>
            <div className={clsx(classes.muscleGroupsColumn, classes.exerciseRowMuscleGroups)}><MuscleGroup muscle_groups={[...new Set(props.exercise.primary_muscles.map(m => m.muscle_group))]} /></div>
            <div className={clsx(classes.exerciseRowCategories, classes.categoriesColumn)}><Categories categories={props.exercise.categories} /></div>
            <div className={clsx(classes.exerciseRowAction, classes.actionColumn)}>
                { props.action_selected  ? (<div onClick={props.onEditClick} className={classes.rowActionIconContainer}><CreateIcon /></div>) : (<div onClick={props.onActionClick} className={classes.rowActionIconContainer}><MoreHorizIcon /></div>)}
            </div>
        </div>
    )

})

function applyExercisesFilter(exercises) {
    let filtered = exercises.items.filter(item => {
        return !exercises.filter || item.name.includes(exercises.filter)
    })
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
            onNewExercise: () => dispatch(showExerciseForm(true)),
            onEditExercise: (exercise) => dispatch(showExerciseForm(true, exercise))
        }
    }
)(styled(ViewExercisesView))
