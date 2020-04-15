import {connect} from 'react-redux'

import {addExercise, saveExercise, closeExerciseForm} from '../../../actions/exercises'

import { EXERCISE } from '../../../constants/exercises';

import {ExerciseForm} from './exercise_form'

const ExerciseFormContainer = connect(
    state => {
        function initializeExercise(exercise, options) {
            return !!exercise ? {...exercise, ...options} : {...EXERCISE, ...options}
        }
        return {
            open: state.exercises.show_exercise_form,
            exercise: initializeExercise(state.exercises.current_exercise, state.exercises.options)
        }
    },
    (dispatch, own_props) => ({
        save: (exercise) => dispatch(!!exercise.new ? addExercise(exercise) : saveExercise(exercise)),
        close: () => dispatch(closeExerciseForm())
    })
)(ExerciseForm)

export default ExerciseFormContainer
