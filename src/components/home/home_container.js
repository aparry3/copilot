import {connect} from 'react-redux'

import {Home} from './home'

const HomeContainer = connect(state => {
    console.log(state)
    return {
        user: state.users.user,
        loading: state.users.loading,
        client_loaded: state.auth.client_loaded
    }
})(Home)

export default HomeContainer
