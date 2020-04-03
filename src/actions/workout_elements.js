import {API_URI} from '../config'
import {dispatched, makeRequest} from './utils'

import {updateWeek} from './weeks'

export const actions = {
    CANCEL_EDIT_WORKOUT_ELEMENT: 'CANCEL_EDIT_WORKOUT_ELEMENT',
    EDIT_WORKOUT_ELEMENT: 'EDIT_WORKOUT_ELEMENT',
    SET_CURRENT_WORKOUT_ELEMENT: 'SET_CURRENT_WORKOUT_ELEMENT',
}

function _getUrl(week_id, day_index, block_index, workout_element_index = null) {
    return workout_element_index == null ? (
        `${API_URI}/weeks/${week_id}/days/${day_index}/blocks/${block_index}/workout_elements`) : (
        `${API_URI}/weeks/${week_id}/days/${day_index}/blocks/${block_index}/workout_elements/${workout_element_index}`
    )
}

export function setCurrentWorkoutElement(type, week_id, day, block, workout_element = null) {
    return {
        type: actions.SET_CURRENT_WORKOUT_ELEMENT,
        workout_element_type: type,
        location: {
            week_id,
            day,
            block,
            workout_element
        }
    }
}

export function editWorkoutElement(workout_element) {
    return dispatch => {
        editWorkoutElement(null)
    }
}

export function cancelEditWorkoutElement(location) {
    return {
        type: actions.CANCEL_EDIT_WORKOUT_ELEMENT,
        location: location
    }
}


const workout_elements = {
    add: (week_id, day, block, workout_element) => dispatched(updateWeek, makeRequest(_getUrl(week_id, day, block), 'POST', workout_element))
}

export const addWorkoutElement = workout_elements.add
