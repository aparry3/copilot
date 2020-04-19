import {connect} from 'react-redux'

import {UserRole} from './user_role'

const UserRoleContainer = connect(
    state => ({
        auth_user: state.auth.auth_user
    })
)(UserRole)

export default UserRoleContainer
