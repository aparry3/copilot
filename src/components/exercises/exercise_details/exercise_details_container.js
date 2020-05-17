import {connect} from 'react-redux'

import {addExercise, saveExercise, closeExerciseDetails, openExerciseDetails} from '../../../actions/exercises'

import { EXERCISE } from '../../../constants/exercises';

import {ExerciseDetails} from './exercise_details'

const ExerciseDetailsContainer = connect(
    state => {
        function initializeExercise(exercise, options) {
            return !!exercise ? {...exercise, ...options} : {...EXERCISE, ...options}
        }
        function canEdit(user, exercise) {
            console.log(user)
            return !exercise || user._id == exercise.author_id
        }
        return {
            open: state.exercises.show_exercise_form,
            exercise: initializeExercise(state.exercises.current_exercise, state.exercises.options),
            callback: state.exercises.callback
        }
    },
    (dispatch, own_props) => ({
        save: (exercise) => dispatch(!!exercise.new ? addExercise(exercise) : saveExercise(exercise)),
        onEditExercise: (exercise) => dispatch(openExerciseDetails(exercise, {edit: true})),
        close: () => dispatch(closeExerciseDetails())
    })
)(ExerciseDetails)

export default ExerciseDetailsContainer
