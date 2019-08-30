import {
    CREATE_WORKOUT,
    EDIT_WORKOUT,
    REARRANGE_WORKOUT,
    REARRANGE_EXERCISE
} from '../actions'

const initialState = {
    client: {
        program: [[
            {
                exercises: [
                    {
                        exercise_id: 'Test',
                        exercise_name: 'Test Exercise',
                        sets: 5,
                        repetitions: 5,
                    },
                    {
                        exercises: [
                            {
                                exercise_id: 'Test',
                                exercise_name: 'Nested Test Exercise'
                            },
                            {
                                exercise_id: 'Test',
                                exercise_name: 'Nested Test Exercise'
                            }
                        ],
                        sets:4,
                        repetitions: 10
                    },
                    {
                        exercise_id: 'Test',
                        exercise_name: 'Test Exercise',
                        sets: 5,
                        repetitions: 5,
                    },
                    {
                        exercise_id: 'Test',
                        exercise_name: 'Test Exercise',
                        sets: 5,
                        repetitions: 5,
                    },
                ]
            }, {
                exercises: [
                    {
                        exercise_id: 'Test',
                        exercise_name: 'Test Exercise',
                        sets: 5,
                        repetitions: 5,
                    },

                    {
                        exercise_id: 'Test',
                        exercise_name: 'Test Exercise',
                        sets: 5,
                        repetitions: 5,
                    },
                    {
                        exercises: [
                            {
                                exercise_id: 'Test',
                                exercise_name: 'Nested Test Exercise'
                            },
                            {
                                exercise_id: 'Test',
                                exercise_name: 'Nested Test Exercise'
                            }
                        ],
                        sets:4,
                        repetitions: 10
                    },
                    {
                        exercise_id: 'Test',
                        exercise_name: 'Test Exercise',
                        sets: 5,
                        repetitions: 5,
                    },
                ]
            }, {}, {}, {}, {}, {}
        ]]
    }
}

const workouts = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_WORKOUT: {
            console.log(action)
            let {type, client, variation, exercise, week, day } = action;
            let new_state = {...state};
            console.log(new_state)
            if (variation == 'add') {
                let workout = new_state[client]['program'][week][day]
                if (!workout.exercises) workout.exercises = []
                workout.exercises.push(
                        {
                            exercise_name: exercise.name,
                            exercise_id: exercise.id
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
export default workouts;
