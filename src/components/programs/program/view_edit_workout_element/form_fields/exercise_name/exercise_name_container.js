import {connect} from 'react-redux'

import {openExerciseForm} from '../../../../../../actions/exercises'

import {ExerciseName} from './exercise_name'

const ExerciseNameContainer = connect(
    state => ({
        exercises: state.exercises.items
    })

)(ExerciseName)

export default ExerciseNameContainer
