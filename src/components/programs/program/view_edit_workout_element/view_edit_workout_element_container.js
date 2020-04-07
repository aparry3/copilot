import {connect} from 'react-redux'

import {saveWorkoutElement, cancelEditWorkoutElement} from '../../../../actions/workout_elements'

import {ViewEditWorkoutElement} from './view_edit_workout_element'

let ViewEditWorkoutElementContainer = connect(
    state => {
        function _getWorkoutElement(location) {
            let {type, types} = state.workout_element
            if (location.workout_element == null) {
                return {...types[type].template}
            }
            return (
                state.active_program.weeks
                .find(w => w._id == location.week_id)
                .days[location.day]
                .workout_blocks[location.block]
                .workout_elements[location.workout_element]
            )
        }
        return {
            workout_element: _getWorkoutElement(state.workout_element.location),
            location: state.workout_element.location
        }
    },
    dispatch => ({
        closeEdit: (location) => dispatch(cancelEditWorkoutElement(location)),
        saveWorkoutElement: (location, workout_element) => dispatch(saveWorkoutElement(location, workout_element))
    })
)(ViewEditWorkoutElement)

export default ViewEditWorkoutElementContainer
