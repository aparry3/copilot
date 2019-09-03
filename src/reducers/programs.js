import {
    ADD_WEEK,
    CREATE_WORKOUT,
    EDIT_WORKOUT,
    RECIEVE_PROGRAMS,
    REARRANGE_WORKOUT,
    REARRANGE_EXERCISE,
    ADD_PROGRAM
} from '../actions';

import {WEEK_SKELETON} from '../constants/programs';
const initialState = {
}

const programs = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PROGRAM: {
            let {client, program} = action;
            let new_state = {...state};
            if (!!new_state[client.id] && !!new_state[client.id].programs) {
                new_state[client.id].programs.push(program);
            } else {
                new_state[client.id].programs = [program];
            }
            return new_state;
        }
        case RECIEVE_PROGRAMS: {
            let new_state = {};
            let {programs} = action;
            programs.forEach(client => {
                new_state[client.client_id] = client.programs;
            })
            return new_state;

        }
        case ADD_WEEK: {
            let {client} = action;
            let new_state = {...state};
            new_state[client.id].program.push([...WEEK_SKELETON]);
            return new_state;
        }
        case EDIT_WORKOUT: {
            console.log(action)
            let {type, client, variation, exercise, week, day } = action;
            let new_state = {...state};
            console.log(new_state)
            if (variation == 'add') {
                let workout = new_state[client.id]['program'][week][day]
                if (!workout.exercises) workout.exercises = []
                workout.exercises.push(
                        {
                            exercise_name: exercise.name,
                            exercise_id: exercise.id,
                            details: exercise.details
                        });
                        console.log(exercise)
                        console.log(new_state)
                return new_state;
            }
            return state;
        }
        default:
            return state;

    }
}
export default programs;
