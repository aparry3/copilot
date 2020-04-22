import {actions as program_actions} from '../actions/programs';
import {actions as week_actions} from '../actions/weeks';

import {copyState} from './utils'
import {WEEK_SKELETON} from '../constants/programs';


const initialState = {all_programs: [], requires_refresh: false, programs_loaded:false}

function _decorateWeeks(program, active_program = null) {
    let weeks = program.weeks.map((w, i) => ({
        ...w, collapsed: !!active_program ? active_program.weeks[i].collapsed : true
    }))
    program.weeks = weeks
    return program
}

function _newProgram(active_program, week) {
    let new_program = {...active_program};
    let new_weeks = [...new_program.weeks];
    new_weeks.push(week)
    new_program.weeks = new_weeks;
    return new_program
}

function _updateProgram(program, all_programs) {
    return all_programs.map(p => {
        if (p._id == program._id) {
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
            let new_weeks = p.weeks.filter(week => week_id != week);
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
    let new_state = copyState(state)
    switch (action.type) {
        case program_actions.ADD_PROGRAM: {
            new_state.all_programs.unshift({...action.program})
            return new_state;
        }
        case week_actions.ADD_WEEK: {
            let {week, program_id} = action;
            new_state.all_programs = _addWeekToProgram(new_state.all_programs, program_id, week._id)
            return new_state;
        }
        case program_actions.RECIEVE_PROGRAMS: {
            return {
                ...new_state,
                programs_loaded: true,
                all_programs: action.programs
            }
        }
        case week_actions.DELETE_WEEK: {
            let {week_id, program_id} = action;
            let s = {
                ...new_state,
                all_programs: _removeWeekFromProgram(new_state.all_programs, program_id, week_id)
            }
            return s
        }
        // case COPY_WORKOUT_ELEMENT: {
        //     let {type, workout_element} = action
        //     return {
        //         ...state,
        //         clipboard: JSON.parse(JSON.stringify(workout_element))
        //     }
        //
        // }
        // case EDIT_WORKOUT: {
        //     let {type, client, program_id, variation, exercise, week, day } = action;
        //     let new_state = {...state};
        //     if (variation == 'add') {
        //         new_state[client.id] = new_state[client.id].map(program => {
        //             if (program._id == program_id) {
        //                 program.weeks[week][day].exercises.push({
        //                     exercise_name: exercise.name,
        //                     exercise_id: exercise.id,
        //                     details: exercise.details
        //                 });
        //             }
        //             return program;
        //         })
        //         return new_state;
        //     }
        //     return state;
        // }
        case program_actions.DELETE_PROGRAM: {
            let {program_id} = action
            return {
                ...new_state,
                all_programs: _deleteProgram(new_state.all_programs, program_id)
            }
        }
        // case UPDATE_WORKOUT: {
        //     let {week_id, day, workout} = action
        //     let new_program = JSON.parse(JSON.stringify(state.active_program))
        //     new_program.weeks = new_program.weeks.map(w => {
        //         if (w._id == week_id) {
        //             w.days[day].workout_elements = workout
        //         }
        //         return w
        //     })
        //     console.log(new_program)
        //     return {
        //         ...state,
        //         active_program: new_program
        //     }
        // }
        default:
            return new_state;

    }
}
export default programs;
