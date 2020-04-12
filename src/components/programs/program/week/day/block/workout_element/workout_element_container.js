import {connect} from 'react-redux'

import {deleteWorkoutElement, setCurrentWorkoutElement} from '../../../../../../../actions/workout_elements'
import {openConfirm} from '../../../../../../../actions/confirm'

import {WorkoutElement} from './workout_element'

const WorkoutElementContainer = connect(
    null,
    (dispatch, own_props) => {
        let location = {
            week_id: own_props.week_id,
            day: own_props.day_index,
            block: own_props.block_index,
            workout_element: own_props.index
        }

        return {
            deleteWorkoutElement: (element_type) => dispatch(openConfirm(
                {action: 'delete', element: element_type},
                () => deleteWorkoutElement(location)
            )),
            editWorkoutElement: () => dispatch(setCurrentWorkoutElement(own_props.workout_element.type, own_props.week_id, own_props.day_index, own_props.block_index, own_props.index))
        }
    }
)(WorkoutElement)

export default WorkoutElementContainer
