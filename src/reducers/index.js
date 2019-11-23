import { combineReducers } from 'redux';
import exercises from './exercises';
import dnd_program from './dnd_program';
import programs from './programs';
import app from './app'
import auth from './auth'

export default combineReducers({
    exercises: exercises,
    programs: programs,
    dnd_program: dnd_program,
    auth: auth,
    app: app
})
