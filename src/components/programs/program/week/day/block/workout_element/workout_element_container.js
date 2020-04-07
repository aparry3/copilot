import {connect} from 'react-redux'

import {setCurrentWorkoutElement} from '../../../../../../../actions/workout_elements'

import {WorkoutElement} from './workout_element'

const WorkoutElementContainer = connect(
    null,
    (dispatch, own_props) => ({
        editWorkoutElement: () => dispatch(setCurrentWorkoutElement(own_props.workout_element.type, own_props.week_id, own_props.day_index, own_props.block_index, own_props.index))
    })
)(WorkoutElement)

export default WorkoutElementContainer
