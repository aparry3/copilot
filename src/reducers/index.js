import { combineReducers } from 'redux';
import exercises from './exercises';
import programs from './programs';
import auth from './auth'

export default combineReducers({
    exercises: exercises,
    programs: programs,
    auth: auth
})
