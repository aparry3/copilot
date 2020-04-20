import {connect} from 'react-redux'

import {setCurrentWorkoutElement} from '../../../../../../../actions/workout_elements'

import {AddExercise} from './add_exercise'

const AddExerciseContainer = connect(
    state => ({
        workout_elemet_types: state.workout_elements.types
    }),
    (dispatch, own_props) => ({
        addWorkoutElement: (type) => dispatch(setCurrentWorkoutElement(type, own_props.week_id, own_props.day_index, own_props.block_index))
    })
)(AddExercise)

export default AddExerciseContainer
