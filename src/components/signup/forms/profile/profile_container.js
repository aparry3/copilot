import {connect} from 'react-redux'

import {Profile} from './profile'

const ProfileContainer = connect(
    state => ({
        auth_user: state.auth.auth_user
    })
)(Profile)

export default ProfileContainer
