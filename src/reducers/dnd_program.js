import {
    RECIEVE_PROGRAM,
    REARRANGE_WORKOUT,
    REARRANGE_EXERCISE,
    SET_DRAG_ELEMENT

} from '../actions';

const initialState = {program: null, loaded: false, drag_element: null }


function _transformWorkoutElement(workout_element, program_id, week_id, day) {
    if (!!workout_element.exercise_id) {
        return {
            name: workout_element.exercise_name,
            day: day,
            week_id: week_id,
            program_id: program_id,
            details: workout_element.details
        }
    } else {
        return workout_element.exercises.map(e => _transformWorkoutElement(e, program_id, week_id, day))

    }
}
function _transformDay(workout, program_id, week_id, day) {
    return workout.workout_elements.map(we => _transformWorkoutElement(we, program_id, week_id, day))
}

function _transformWeek(week, program_id) {
     return [
        _transformDay(week.days['monday'], program_id, week._id, 'monday'),
        _transformDay(week.days['tuesday'], program_id, week._id, 'tuesday'),
        _transformDay(week.days['wednesday'], program_id, week._id, 'wednesday'),
        _transformDay(week.days['thursday'], program_id, week._id, 'thursday'),
        _transformDay(week.days['friday'], program_id, week._id, 'friday'),
        _transformDay(week.days['saturday'], program_id, week._id, 'saturday'),
        _transformDay(week.days['sunday'], program_id, week._id, 'sunday')
    ]

}

function _transformProgram(program) {
    return program.weeks.map(w => _transformWeek(w, program._id))
}



const dnd_program = (state = initialState, action) => {
    switch (action.type) {
        case SET_DRAG_ELEMENT: {
            console.log("Set drag element")
            return {
                ...state,
                drag_element: action.element
            }
        }
        case REARRANGE_EXERCISE: {
            let {old_week, new_week, old_day, new_day, old_index, new_index } = action
            let new_program = Object.assign([...state.program])
            new_program[old_week] = Object.assign([...new_program[old_day]])
            new_program[old_week][old_day] = Object.assign([...new_program[old_week][old_day]])
            new_program[old_week][old_day].splice(old_index, 1)
            new_program[new_week] = Object.assign([...new_program[new_day]])
            new_program[new_week][new_day] = Object.assign([...new_program[new_week][new_day]])
            new_program[new_week][new_day].splice(new_index, 0, state.drag_element)
            return new_program
        }
        case RECIEVE_PROGRAM: {
            console.log('recieve program')
            console.log(action.program)
            return {
                ...state,
                program: _transformProgram(action.program),
                loaded: true
            }
        }

        default:
            return state;

    }
}
export default dnd_program;
