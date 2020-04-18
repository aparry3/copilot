import {connect} from 'react-redux'

import {Signup} from './signup'

const SignupContainer = connect(
    state => ({
        auth_user: state.auth.auth_user
    })
)(Signup)

export default SignupContainer
