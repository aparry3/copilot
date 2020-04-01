export const actions = {
    ADD_WORKOUT_ELEMENT: 'ADD_WORKOUT_ELEMENT',
    EDIT_WORKOUT_ELEMENT: 'EDIT_WORKOUT_ELEMENT',
}




export function addWorkoutElement(type) {
    return {
        type: actions.ADD_WORKOUT_ELEMENT,
        workout_element_type: type
    }
}

export function editWorkoutElement(workout_element) {
    return {
        type: actions.EDIT_WORKOUT_ELEMENT,
        workout_element
    }
}

export function clearCurrentWorkoutElement() {
    return editWorkoutElement(null)
}
