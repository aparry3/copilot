import {
    ADD_WEEK,
    CREATE_WORKOUT,
    EDIT_WORKOUT,
    RECIEVE_PROGRAM,
    RECIEVE_PROGRAMS,
    REARRANGE_WORKOUT,
    REARRANGE_EXERCISE,
    ADD_PROGRAM,
    EDIT_WEEK,
    SET_DRAG_ELEMENT
} from '../actions';

import {WEEK_SKELETON} from '../constants/programs';
const initialState = {all_programs: [], programs_loaded:false, active_program: null, drag_element: null }

function _newProgram(active_program, week) {
    let new_program = {...active_program};
    let new_weeks = [...new_program.weeks];
    new_weeks.push(week)
    new_program.weeks = new_weeks;
    return new_program
}
function _addWeekToProgram(all_programs, program_id, week_id) {
    let new_programs = [...all_programs];
    return new_programs.map(p => {
        if (p._id == program_id) {
            let new_weeks = [...p.weeks];
            new_weeks.push(week_id)
            p.weeks = new_weeks
        }
        return p
    })
}

function getItem(week_id, day, index, weeks) {
    let matching_weeks = weeks.filter(w => w._id == week_id)
    if (matching_weeks.length > 0) {
        let item = matching_weeks[0].days[day].workout_elements[index]
        return item
    }
    return null
}

function _remove(program, location) {
    let item = getItem(location.week_id, location.day, location.index, program.weeks)
    program.weeks = program.weeks.map(w => {
        if (w._id == location.week_id) {
            w.days[location.day].workout_elements.splice(location.index, 1)
        }
        return w
    })
    return item
}

function _insert(program, location, item) {
    return {
        ...program,
        weeks: program.weeks.map(w => {
            if (w._id == location.week_id) {
                w.days[location.day].workout_elements.splice(location.index, 0, item)
            }
            return w
        })
    }
}

const programs = (state = initialState, action) => {
    switch (action.type) {
        case SET_DRAG_ELEMENT: {
            return {
                ...state,
                drag_element: action.element
            }
        }
        case ADD_PROGRAM: {
            let new_state = {...state, all_programs: [...state.all_programs], active_program: {...action.program}};
            new_state.all_programs.unshift({...action.program})
            return new_state;
        }
        case REARRANGE_EXERCISE: {
            let {old_location, new_location} = action
            let new_program = {...state.active_program}
            let item = _remove(new_program, old_location)
            new_program = _insert(new_program, new_location, item)
            return {...state, active_program: new_program}
        }
        case RECIEVE_PROGRAMS: {
            return {
                ...state,
                programs_loaded: true,
                all_programs: action.programs
            }
        }
        case RECIEVE_PROGRAM: {
            return {
                ...state,
                active_program: action.program
            }
        }
        case ADD_WEEK: {
            let {week, program_id} = action;
            let new_state = {
                ...state,
                active_program: _newProgram({...state.active_program}, week),
                all_programs: _addWeekToProgram(state.all_programs, program_id, week._id)
            }

            return new_state;
        }
        case EDIT_WEEK: {
            let {week, week_id} = action;
            let new_state = {
                ...state,
                active_program: {
                    ...state.active_program,
                    weeks: state.active_program.weeks.map(w => {
                        if (w._id == week_id) {
                            return week
                        }
                        return w
                    })
                },
            }

            return new_state;
        }
        case EDIT_WORKOUT: {
            let {type, client, program_id, variation, exercise, week, day } = action;
            let new_state = {...state};
            if (variation == 'add') {
                new_state[client.id] = new_state[client.id].map(program => {
                    if (program._id == program_id) {
                        program.weeks[week][day].exercises.push({
                            exercise_name: exercise.name,
                            exercise_id: exercise.id,
                            details: exercise.details
                        });
                    }
                    return program;
                })
                return new_state;
            }
            return state;
        }
        default:
            return state;

    }
}
export default programs;
