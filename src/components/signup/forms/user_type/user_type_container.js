import {connect} from 'react-redux'

import {UserType} from './user_type'

const UserTypeContainer = connect(
    state => ({
        auth_user: state.auth.auth_user
    })
)(UserType)

export default UserTypeContainer
