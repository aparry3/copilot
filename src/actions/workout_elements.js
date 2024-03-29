import {API_URI} from '../config'
import {dispatched, makeRequest} from './utils'

import {updateWeek} from './weeks'

export const actions = {
    CANCEL_EDIT_WORKOUT_ELEMENT: 'CANCEL_EDIT_WORKOUT_ELEMENT',
    EDIT_WORKOUT_ELEMENT: 'EDIT_WORKOUT_ELEMENT',
    SET_CURRENT_WORKOUT_ELEMENT: 'SET_CURRENT_WORKOUT_ELEMENT',
}

function _getUrl(location) {
    let {week_id, day, block, workout_element} = location
    return workout_element == null ? (
        `${API_URI}/weeks/${week_id}/days/${day}/blocks/${block}/workout_elements`) : (
        `${API_URI}/weeks/${week_id}/days/${day}/blocks/${block}/workout_elements/${workout_element}`
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

export function cancelEditWorkoutElement() {
    return {
        type: actions.CANCEL_EDIT_WORKOUT_ELEMENT
    }
}


const workout_elements = {
    delete: (location) => dispatched(updateWeek, makeRequest(_getUrl(location), 'DELETE')),
    save: (location, workout_element) => dispatched(updateWeek, makeRequest(_getUrl(location), location.workout_element == null ? 'POST' : 'PUT', workout_element))
}

export const deleteWorkoutElement = workout_elements.delete
export const saveWorkoutElement = workout_elements.save
