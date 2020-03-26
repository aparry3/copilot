import { combineReducers } from 'redux';
import exercises from './exercises';
import programs from './programs';
import active_program from './active_program';
import app from './app'
import auth from './auth'


export default combineReducers({
    exercises: exercises,
    programs: programs,
    active_program: active_program,
    auth: auth,
    app: app
})
