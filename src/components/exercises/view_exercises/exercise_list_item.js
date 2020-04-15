import clsx from 'clsx'
import React from 'react'

import {Categories} from '../utils'
import CreateIcon from '@material-ui/icons/Create';
import { MuscleGroups } from '../../utils';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './view_exercises.styles'
const useStyles = makeStyles(styles)

export const ExerciseListItem = (props) => {
    let classes = useStyles()

    function handleSelect(e) {
        props.handleExerciseSelect(props.index)
    }

    let css_class = props.selected ? clsx(classes.exerciseListItem, classes.selected) : clsx(classes.exerciseListItem)
    return (
        <div className={classes.exerciseListRow} onClick={handleSelect}>
            <div className={clsx(classes.exerciseRowName, classes.nameColumn)}>{props.exercise.name}</div>
            <div className={clsx(classes.muscleGroupsColumn, classes.exerciseRowMuscleGroups)}><MuscleGroups muscle_groups={[...new Set(props.exercise.primary_muscles.map(m => m.muscle_group))]} /></div>
            <div className={clsx(classes.exerciseRowCategories, classes.categoriesColumn)}><Categories categories={props.exercise.categories} /></div>
            <div className={clsx(classes.exerciseRowAction, classes.actionColumn)}>
                { props.action_selected  ? (<div onClick={props.onEditClick} className={classes.rowActionIconContainer}><CreateIcon /></div>) : (<div onClick={props.onActionClick} className={classes.rowActionIconContainer}><MoreHorizIcon /></div>)}
            </div>
        </div>
    )

}
