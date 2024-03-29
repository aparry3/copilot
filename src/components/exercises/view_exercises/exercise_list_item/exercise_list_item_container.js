import { connect } from 'react-redux';

import {openConfirm} from '../../../../actions/confirm'
import {deleteExercise} from '../../../../actions/exercises'

import {ExerciseListItem} from './exercise_list_item'


const ExerciseListItemContainer = connect(
    (state, own_props) => ({
        is_author: state.users.user._id == own_props.exercise.author_id
    }),
    (dispatch, own_props) => {
        return {
            delete: () => dispatch(openConfirm(
                {action: 'delete', element: own_props.exercise.name},
                () => deleteExercise(own_props.exercise._id)
            ))
        }
    }
)(ExerciseListItem)

export default ExerciseListItemContainer
