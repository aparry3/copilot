import { combineReducers } from 'redux';

import active_program from './active_program';
import app from './app'
import auth from './auth'
import confirm from './confirm'
import exercises from './exercises';
import constants from './constants'
import programs from './programs';
import users from './users'
import workout_elements from './workout_elements'


export default combineReducers({
    active_program: active_program,
    app: app,
    auth: auth,
    confirm: confirm,
    constants: constants,
    exercises: exercises,
    programs: programs,
    users: users,
    workout_elements: workout_elements
})
