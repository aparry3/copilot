import {connect} from 'react-redux'

import {clearCurrentWorkoutElement} from '../../../../actions/workout_elements'

import {ViewEditWorkoutElement} from './view_edit_workout_element'

let ViewEditWorkoutElementContainer = connect(null,
    dispatch => ({
        closeEdit: () => dispatch(clearCurrentWorkoutElement())
    })
)(ViewEditWorkoutElement)

export default ViewEditWorkoutElementContainer
