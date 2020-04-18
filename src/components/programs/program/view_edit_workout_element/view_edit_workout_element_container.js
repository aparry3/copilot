import {connect} from 'react-redux'

import {openExerciseForm} from '../../../../actions/exercises'
import {saveWorkoutElement, cancelEditWorkoutElement} from '../../../../actions/workout_elements'

import {ViewEditWorkoutElement} from './view_edit_workout_element'

let ViewEditWorkoutElementContainer = connect(
    state => {
        function _getWorkoutElement(location) {
            console.log(state.workout_elements)
            let {type, types} = state.workout_elements
            let workout_element
            if (location.workout_element == null) {
                workout_element = {...types[type].template}
            } else {
                workout_element = (
                    state.active_program.weeks
                    .find(w => w._id == location.week_id)
                    .days[location.day]
                    .workout_blocks[location.block]
                    .workout_elements[location.workout_element]
                )
            }
            if (workout_element.type == 'superset') {
                workout_element.exercises = workout_element.exercises.map(e => ({...e, collapsed: false}))
            }
            return workout_element
        }
        let we = !!state.active_program.current_workout_element ? state.active_program.current_workout_element : _getWorkoutElement(state.active_program.location)
        return {
            workout_element: we,
            location: state.active_program.location
        }
    },
    dispatch => ({
        addExercise: (name, workout_element) => dispatch(openExerciseForm(null, {name: name}, workout_element)),
        closeEdit: () => dispatch(cancelEditWorkoutElement()),
        saveWorkoutElement: (location, workout_element) => dispatch(saveWorkoutElement(location, workout_element))
    })
)(ViewEditWorkoutElement)

export default ViewEditWorkoutElementContainer
