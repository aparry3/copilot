import { combineReducers } from 'redux';
import exercises from './exercises';
import workouts from './workouts';

export default combineReducers({
    exercises: exercises,
    clients: workouts
})
