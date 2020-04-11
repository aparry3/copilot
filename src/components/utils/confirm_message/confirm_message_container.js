import {connect} from 'react-redux'

import {closeConfirm, confirm} from '../../../actions/confirm'

import {ConfirmMessage} from './confirm_message'

const ConfirmMessageContainer = connect(
    state => ({
        details: state.confirm.details,
        open: state.confirm.open,
        action: state.confirm.action
    }),
    dispatch => ({
        close: () => dispatch(closeConfirm()),
        confirm: (action) => dispatch(confirm(action))
    })

)(ConfirmMessage)

export default ConfirmMessageContainer
