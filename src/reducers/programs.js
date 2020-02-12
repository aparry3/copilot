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
    DID_REFRESH
} from '../actions';

import {WEEK_SKELETON} from '../constants/programs';


const initialState = {all_programs: [], requires_refresh: false, programs_loaded:false, active_program: null, drag_element: null, current_week: null, clipboard: null}

function _newProgram(active_program, week) {
    let new_program = {...active_program};
    let new_weeks = [...new_program.weeks];
    new_weeks.push(week)
    new_program.weeks = new_weeks;
    return new_program
}

function _updateProgram(program, all_programs) {
    console.log(program._id)
    return all_programs.map(p => {
        if (p._id == program._id) {
            console.log(program)
            return program
        }
        return p
    })
}

function _deleteProgram(programs, program_id) {
    return programs.filter(x => x._id != program_id)
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

function _removeWeekFromProgram(all_programs, program_id, week_id) {
    let new_programs = [...all_programs];
    return new_programs.map(p => {
        if (p._id == program_id) {
            let new_weeks = p.weeks.filter(week => week_id != week._id);
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
        case ADD_PROGRAM: {
            let new_state = {...state, all_programs: [...state.all_programs], active_program: {...action.program}};
            new_state.all_programs.unshift({...action.program})
            return new_state;
        }
        case RECIEVE_PROGRAMS: {
            return {
                ...state,
                programs_loaded: true,
                all_programs: action.programs
            }
        }
        case RECIEVE_PROGRAM: {
            let new_state = {
                ...state,
                all_programs: JSON.parse(JSON.stringify(_updateProgram(action.program, state.all_programs))),
                active_program: action.program
            }
            console.log(new_state.all_programs)
            return new_state
        }
        case ADD_WEEK: {
            let {week, program_id} = action;
            let new_program = JSON.parse(JSON.stringify(state.active_program))
            new_program.weeks.push(week)
            let new_state = {
                ...state,
                all_programs: _addWeekToProgram(state.all_programs, program_id, week),
                requires_refresh: true,
                active_program: new_program
            }

            return new_state;
        }
        case DELETE_WEEK: {
            let {week_id, program_id} = action;
            let new_program = JSON.parse(JSON.stringify(state.active_program))
            new_program.weeks = new_program.weeks.filter(week => week._id != week_id)

            return {
                ...state,
                programs_loaded: true,
                requires_refresh: true,
                all_programs: _removeWeekFromProgram(state.all_programs, program_id, week_id),
                active_program: new_program
            }
        }
        case UPDATE_WEEK: {
            console.log("UPDATE week")
            let {week, week_id} = action;
            let new_state = JSON.parse(JSON.stringify(state))
            new_state.active_program.weeks = new_state.active_program.weeks.map(w => {
                if (w._id == week_id) {
                    return week
                }
                return w
            })
            new_state.requires_refresh = true
            return new_state;
        }
        case COPY_WORKOUT_ELEMENT: {
            let {type, workout_element} = action
            return {
                ...state,
                clipboard: JSON.parse(JSON.stringify(workout_element))
            }

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
        case SET_ACTIVE_PROGRAM: {
            return {
                ...state,
                requires_refresh: true,
                active_program: state.all_programs.find(x => x._id == action.id)
            }
        }
        case SET_CURRENT_WEEK: {
            console.log(action.index)
            let {index} = action
            return {
                ...state,
                requires_refresh: true,
                current_week: {
                    ...state.active_program.weeks[index],
                    index
                }
            }
        }
        case DELETE_PROGRAM: {
            let {program_id} = action
            let new_state = {
                ...state,
                all_programs: _deleteProgram(state.all_programs, program_id)
            }
            return new_state
        }
        case UPDATE_WORKOUT: {
            let {week_id, day, workout} = action
            let new_program = JSON.parse(JSON.stringify(state.active_program))
            new_program.weeks = new_program.weeks.map(w => {
                if (w._id == week_id) {
                    w.days[day].workout_elements = workout
                }
                return w
            })
            console.log(new_program)
            return {
                ...state,
                active_program: new_program
            }
        }
        case DID_REFRESH: {
            return {
                ...state,
                requires_refresh: false
            }
        }
        default:
            return state;

    }
}
export default programs;
