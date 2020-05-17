import { connect } from 'react-redux';

import {openExerciseDetails} from '../../../actions/exercises'
import {ViewExercises} from './view_exercises'

function applyExercisesFilter(exercises) {
    let filtered = exercises.items.filter(item => {
        return !exercises.filter || item.name.includes(exercises.filter)
    })
    return filtered;
}

const ViewExercisesContainer = connect(
    (state) => {
        return {
            exercises: applyExercisesFilter(state.exercises)
        }
    },
    (dispatch, own_props) => {
        return {
            onNewExercise: () => dispatch(openExerciseDetails(null, {edit: true})),
            onEditExercise: (exercise, edit) => dispatch(openExerciseDetails(exercise, {edit: edit}))
        }
    }
)(ViewExercises)

export default ViewExercisesContainer
