import {connect} from 'react-redux'

import {saveWorkoutElement, cancelEditWorkoutElement} from '../../../../actions/workout_elements'

import {ViewEditWorkoutElement} from './view_edit_workout_element'

let ViewEditWorkoutElementContainer = connect(
    state => {
        function _getWorkoutElement(location) {
            console.log(state.workout_element)
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
        let we = _getWorkoutElement(state.active_program.location)
        console.log(we)
        return {
            workout_element: we,
            location: state.active_program.location
        }
    },
    dispatch => ({
        closeEdit: () => dispatch(cancelEditWorkoutElement()),
        saveWorkoutElement: (location, workout_element) => dispatch(saveWorkoutElement(location, workout_element))
    })
)(ViewEditWorkoutElement)

export default ViewEditWorkoutElementContainer
