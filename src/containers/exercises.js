import { connect } from 'react-redux';
import {ExercisesPage} from '../components/exercises'
import {addExercise, setFilter} from '../actions'

function applyExercisesFilter(exercises) {
    console.log(exercises)
    let filtered = exercises.items.filter(item => {
        return !exercises.filter || item.name.includes(exercises.filter)
    })
    console.log(filtered);
    return filtered;
}

export const ExercisesPageContainer = connect(
        (state) => {
            return {
                exercises: applyExercisesFilter(state.exercises)
            }
        },
        (dispatch) => {
            return {
                saveExercise: (exercise) => dispatch(addExercise(exercise)),
                setFilter: (filter_text) => dispatch(setFilter(filter_text))
            }
        }
)(ExercisesPage)
