import {actions as week_actions} from '../actions/weeks'
import {actions as program_actions} from '../actions/programs'
import {copyState} from './utils'
import {
    ADD_WEEK,
    CREATE_WORKOUT,
    EDIT_WORKOUT,
    RECIEVE_PROGRAM,
    RECIEVE_PROGRAMS,
    REARRANGE_WORKOUT,
    REARRANGE_EXERCISE,
    ADD_PROGRAM,
    UPDATE_WEEK,
    SET_DRAG_ELEMENT,
    DELETE_PROGRAM,
    DELETE_WEEK,
    COPY_WORKOUT_ELEMENT,
    SET_ACTIVE_PROGRAM,
    UPDATE_WORKOUT,
    SET_CURRENT_WEEK,
    DID_REFRESH,
    TOGGLE_WEEK
} from '../actions';

const initial_state = {loading: false}

const active_program = (state = initial_state, action) => {
    let new_state = copyState(state)
    switch (action.type) {
        case week_actions.ADD_WEEK: {
            let {week} = action;
            week.collapsed = true
            new_state.weeks.push(week)
            return new_state;
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
                current_week: {
                    ...new_state.weeks[index],
                    index
                }
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
