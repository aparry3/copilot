import { combineReducers } from 'redux';

import active_program from './active_program';
import app from './app'
import auth from './auth'
import exercises from './exercises';
import programs from './programs';
import workout_element from './workout_element'


export default combineReducers({
    active_program: active_program,
    app: app,
    auth: auth,
    exercises: exercises,
    programs: programs,
    workout_element: workout_element
})
