import clsx from 'clsx'
import React from 'react'

import {Categories} from '../../utils'
import ClearIcon from '@material-ui/icons/Clear';
import CreateIcon from '@material-ui/icons/Create';
import { MuscleGroups } from '../../../utils';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './exercise_list_item.styles'
const useStyles = makeStyles(styles)

export const ExerciseListItem = (props) => {
    let classes = useStyles()

    function handleSelect(e) {
        props.handleExerciseSelect(e, props.index)
    }

    function handleDelete(e) {
        e.stopPropagation()
        props.delete()
    }

    let css_class = props.selected ? clsx(classes.exerciseListItem, classes.selected) : clsx(classes.exerciseListItem)
    return (
        <div className={clsx(classes.exerciseListRow, classes.exerciseListItem)} onClick={handleSelect}>
            <div className={clsx(classes.exerciseRowName, classes.nameColumn)}>{props.exercise.name}</div>
            <div className={clsx(classes.muscleGroupsColumn, classes.exerciseRowMuscleGroups)}><MuscleGroups muscle_groups={!!props.exercise.muscles ? [...new Set(props.exercise.muscles.map(m => m.muscle_group))] : []} /></div>
            <div className={clsx(classes.exerciseRowCategories, classes.categoriesColumn)}><Categories categories={props.exercise.category} /></div>
            <div className={clsx(classes.exerciseRowAction, classes.actionColumn)}>
                { props.action_selected  ? (
                    <div className={classes.rowActionIconContainer}>
                        <div onClick={props.onEditClick} className={classes.action}>
                            <CreateIcon />
                        </div>
                        { !!props.is_author && (
                        <div onClick={handleDelete} className={classes.action}>
                            <ClearIcon />
                        </div>
                        )}
                    </div>
                ) : (
                    <div className={classes.rowActionIconContainer}>
                        <div onClick={props.onActionClick} className={classes.action}>
                            <MoreHorizIcon />
                        </div>
                    </div>)}
            </div>
        </div>
    )

}
