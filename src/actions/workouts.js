export const CREATE_WORKOUT = 'CREATE_WORKOUT';
export const EDIT_WORKOUT = 'EDIT_WORKOUT';
export const REARRANGE_WORKOUT = 'REARRANGE_WORKOUT';
export const REARRANGE_EXERCISE = 'REARRANGE_EXERCISE';

export function addExerciseToWorkout(client, week_index, day_index, exercise) {
    console.log(exercise)
    return {
        type: EDIT_WORKOUT,
        client,
        variation: 'add',
        exercise,
        week: week_index,
        day: day_index
    }
}
