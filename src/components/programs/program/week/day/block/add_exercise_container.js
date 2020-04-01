import {connect} from 'react-redux'
import {addWorkoutElement} from '../../../../../../actions/workout_elements'
import {AddExercise} from './add_exercise'

const AddExerciseContainer = connect(
    state => ({
        workout_elemet_types: state.workout_element.types
    }),
    dispatch => ({
        addWorkoutElement: (type) => dispatch(addWorkoutElement(type))
    })
)(AddExercise)

export default AddExerciseContainer
