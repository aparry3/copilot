import {connect} from 'react-redux'

import {App} from './app'

const AppContainer = connect(state => {
    return {
        client_loaded: state.auth.client_loaded,
        auth_user: state.auth.auth_user
    }
})(App);

export default AppContainer
