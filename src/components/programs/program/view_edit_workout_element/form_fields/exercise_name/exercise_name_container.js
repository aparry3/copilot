import {connect} from 'react-redux'

import {ExerciseName} from './exercise_name'

const ExerciseNameContainer = connect(
    state => ({
        exercises: state.exercises.items
    })
)(ExerciseName)

export default ExerciseNameContainer
