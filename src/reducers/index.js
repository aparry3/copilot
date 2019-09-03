import { combineReducers } from 'redux';
import exercises from './exercises';
import programs from './programs';

export default combineReducers({
    exercises: exercises,
    programs: programs
})
