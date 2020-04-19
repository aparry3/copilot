import {connect} from 'react-redux'

import {Signup} from './signup'

import {addUser} from '../../actions/users'


const SignupContainer = connect(
    state => ({
        auth_user: state.auth.auth_user,
        user: state.users.user
    }),
    dispatch => ({
        addUser: (user) => dispatch(addUser(user))
    })
)(Signup)

export default SignupContainer
