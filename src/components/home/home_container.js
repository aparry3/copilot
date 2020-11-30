import {connect} from 'react-redux'

import {Home} from './home'

const HomeContainer = connect(state => {
    return {
        user: state.users.user,
        loading: state.users.loading,
        client_loaded: state.auth.client_loaded,
        form_open: state.exercises.show_exercise_form
    }
})(Home)

export default HomeContainer
