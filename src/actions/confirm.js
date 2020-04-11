export const actions = {
    CLOSE_CONFIRM: 'CLOSE_CONFIRM',
    OPEN_CONFIRM: 'OPEN_CONFIRM'
}

export function openConfirm(details, action) {
    return {
        type: actions.OPEN_CONFIRM,
        details,
        action
    }
}

export function confirm(action) {
    return async dispatch => {
        await dispatch(action())
        dispatch(closeConfirm())
    }
}

export function closeConfirm() {
    return {
        type: actions.CLOSE_CONFIRM,
    }
}
