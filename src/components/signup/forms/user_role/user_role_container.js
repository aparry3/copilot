import {connect} from 'react-redux'

import {logout} from '../../../../actions/auth'

import {UserRole} from './user_role'

const UserRoleContainer = connect(
    state => ({
        auth_user: state.auth.auth_user
    }),
    dispatch => ({
        logout: logout
    })
)(UserRole)

export default UserRoleContainer
