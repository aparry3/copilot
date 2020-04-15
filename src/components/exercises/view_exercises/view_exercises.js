import clsx from 'clsx'
import React, {useEffect, useState} from 'react';
import { normalize, titleCase } from '../../utils';

import AddIcon from '@material-ui/icons/Add'
import {ExerciseListItem} from './exercise_list_item'
import {PageHeader} from '../../utils'
import {SearchBar} from '../utils';
import {ViewExercise} from './view_exercise'

import {makeStyles} from '@material-ui/core/styles';
import {styles} from './view_exercises.styles'
const useStyles = makeStyles(styles)


export const ViewExercises = props => {
    let [selected_exercise_index, setSelectedExerciseIndex] = useState(-1)
    let [action_selected_index, setActionSelectedIndex] = useState(-1)
    let classes = useStyles()

    useEffect(() => {
        setSelectedExerciseIndex(-1)
        setActionSelectedIndex(-1)
    }, [props.exercises])

    function handleEditClick(e, index) {
        e.stopPropagation()
        e.preventDefault()
        props.onEditExercise(props.exercises[index])
    }

    function handleActionClick(e, index) {
        e.stopPropagation()
        e.preventDefault()
        setActionSelectedIndex(index)

    }

    function handleSelect(index) {
        setSelectedExerciseIndex(index)
        setActionSelectedIndex(-1)

    }
    function handleCancel(){
        setSelectedExerciseIndex(-1)
    }

    return (
        <div className={classes.exercisesPageContainer}>
            <div className={classes.viewExercisesContainer} >
                <div className={classes.exercisesListPageContainer} >
                    <PageHeader
                        content={(
                            <>
                                <span>Exercises</span>
                                <SearchBar />
                            </>
                        )}
                        action={<div className={classes.exercisesHeaderAction}><div onClick={props.onNewExercise} className={classes.addIconContainer}><AddIcon /></div></div>} />
                    <div className={classes.exercisesListContainer} >
                        <div className={classes.exerciseListHeader} >
                            <div className={classes.nameColumn}><span className={classes.headerText}>Name</span></div>
                            <div className={classes.muscleGroupsColumn}><span className={classes.headerText}>Muscle Group</span></div>
                            <div className={classes.categoriesColumn}><span className={classes.headerText}>Category</span></div>
                            <div className={classes.actionColumn}><span className={classes.headerText}>Action</span></div>
                        </div>
                        <hr className={classes.hr} />
                        <div className={classes.exerciseListBody}>
                            {props.exercises.map((exercise, index) => {
                                return (<ExerciseListItem
                                    onEditClick={(e) => handleEditClick(e, index)}
                                    onActionClick={(e) => handleActionClick(e, index)}
                                    action_selected={action_selected_index == index}
                                    selected={index==selected_exercise_index}
                                    index={index}
                                    handleExerciseSelect={handleSelect}
                                    key={exercise._id}
                                    exercise={exercise}/>
                                );
                            })}
                        </div>
                    </div>
                </div>
                { selected_exercise_index > -1 && (
                    <div className={classes.exerciseViewContainer}>
                        <ViewExercise onEditClick={(e) => handleEditClick(e, selected_exercise_index)} exercise={props.exercises[selected_exercise_index]} onCancel={handleCancel}/>
                    </div>
                )}

            </div>
        </div>
    )

}
