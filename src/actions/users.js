export const actions = {
    RECIEVE_USER: 'RECIEVE_USER',
}

export function setUserType(type) {
    return {
        type: actions.SET_USER_TYPE,
        user_type: type
    }
}
