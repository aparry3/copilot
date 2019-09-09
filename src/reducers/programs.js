import {
    ADD_WEEK,
    CREATE_WORKOUT,
    EDIT_WORKOUT,
    RECIEVE_PROGRAM,
    RECIEVE_PROGRAMS,
    REARRANGE_WORKOUT,
    REARRANGE_EXERCISE,
    ADD_PROGRAM
} from '../actions';

import {WEEK_SKELETON} from '../constants/programs';
const initialState = {all_programs: [], current_program:{}}

const programs = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PROGRAM: {
            let new_state = {...state, all_programs: [action.program, ...state.all_programs]};
            return new_state;
        }
        case RECIEVE_PROGRAMS: {
            return {
                ...state,
                all_programs: action.programs
            }
        }
        case RECIEVE_PROGRAM: {
            return {
                ...state,
                current_program: action.program
            }
        }

        case ADD_WEEK: {
            let {client, program_id} = action;
            let new_state = {...state};
            new_state[client.id] = new_state[client.id].map(program => {
                if (program._id == program_id) {
                    return {
                        ...program,
                        weeks: [
                            ...program.weeks,
                            [...WEEK_SKELETON]
                        ]
                    }
                }
                return program
            });
            console.log(new_state)
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
