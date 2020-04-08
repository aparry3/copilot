import {actions as program_actions} from '../actions/programs'
import {actions as workout_element_actions} from '../actions/workout_elements'
import {actions as week_actions} from '../actions/weeks'
import {copyState} from './utils'

import {WORKOUT_ELEMENT_TYPES} from './workout_element'

const initial_state = {loading: false, current_workout_element: null, location: null}

function cancelEditWorkoutElement(location, new_state) {
    let block = new_state.weeks.find(w => w._id == location.week_id).days[location.day].workout_blocks[location.block]
    if (location.workout_element == null || block.workout_elements[location.workout_element].placeholder) {
        block.workout_elements.pop()
    } else {
        block.workout_elements[location.workout_element].active = false
    }
    new_state.weeks = new_state.weeks.map(w => {
        if (w._id == location.week_id) {
            w.days[location.day].workout_blocks[location.block] = block
        }
        return w
    })
    return new_state
}

const active_program = (state = initial_state, action) => {
    let new_state = copyState(state)
    switch (action.type) {
        case week_actions.ADD_WEEK: {
            let {week} = action;
            week.collapsed = true
            new_state.weeks.push(week)
            return new_state;
        }
        case workout_element_actions.CANCEL_EDIT_WORKOUT_ELEMENT: {
            let {location} = state
            if (!!location) {
                new_state = cancelEditWorkoutElement(location, new_state)
            }
            new_state.location = null
            return new_state
        }
        case workout_element_actions.EDIT_WORKOUT_ELEMENT: {
            return new_state
        }

        case week_actions.DELETE_WEEK: {
            let {week_id} = action;
            return {
                ...new_state,
                weeks: new_state.weeks.filter(week => week._id != week_id)
            }
        }
        case program_actions.RECIEVE_PROGRAM: {
            let program = action.program
            program.weeks = program.weeks.map(w => {
                w.collapsed = true
                return w
            })
            return {
                ...program,
                loading: false
            }
        }
        case workout_element_actions.SAVE_WORKOUT_ELEMENT: {
            new_state.weeks.find(
                w => w._id == state.location.week_id
            ).days[state.location.day_index]
            .workout_blocks[state.location.block_index]
            .workout_elements[state.location.workout_element_index] = action.workout_element

            new_state.current_workout_element = null
            new_state.location = null
            return new_state
        }
        case workout_element_actions.SET_CURRENT_WORKOUT_ELEMENT: {
            if (state.location != null) {
                new_state = cancelEditWorkoutElement(state.location, new_state)
            }
            let week = new_state.weeks.find(w => w._id == action.location.week_id)
            let day = week.days[action.location.day]
            let block = day.workout_blocks[action.location.block]
            if (action.location.workout_element == null) {
                block.workout_elements.push({type: action.workout_element_type, placeholder: true, active: true})
            } else {
                block.workout_elements[action.location.workout_element].active = true
            }
            day.workout_blocks[action.location.block] = block
            week.days[action.location.day] = day
            new_state.weeks = new_state.weeks.map(w => {
                if (w._id == action.location.week_id) {
                    return week
                }
                return w
            })
            new_state.location = action.location
            return new_state
        }
        case program_actions.SET_ACTIVE_PROGRAM: {
            return {
                loading: true,
                program: action.program
            }
        }
        case week_actions.SET_CURRENT_WEEK: {
            let {index} = action
            console.log(index)
            return {
                ...new_state,
                current_week: index
            }
        }
        case week_actions.TOGGLE_WEEK: {
            return {
                ...new_state,
                weeks: new_state.weeks.map(w => {
                    if (w._id == action.week_id) {
                        w.collapsed = !w.collapsed
                    }
                    return w
                })
            }
        }
        case week_actions.UPDATE_WEEK: {
            let {week} = action;
            return {
                ...new_state,
                location: null,
                weeks: new_state.weeks.map(w => {
                    if (w._id == week._id) {
                        week.collapsed = w.collapsed
                        return week
                    }
                    return w
                })
            };
        }
        default:
            return new_state


    }
}

export default active_program
